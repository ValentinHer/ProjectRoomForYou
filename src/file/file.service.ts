import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { PropertyService } from '../property/property.service';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FileService {

  client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_PUBLIC_ACCESS_KEY,
        secretAccessKey: process.env.AWS_PUBLIC_ACCESS_SECRET
    }
  })

  constructor(@InjectRepository(File) private fileRepository: Repository<File>, 
              private propertyService: PropertyService){}

  async create(files: Array<Express.Multer.File>, createFileDto: CreateFileDto) {
    const {propertyId } = createFileDto;

    const propertyFound = await this.propertyService.findOne(propertyId);

    if(!files) throw new BadRequestException(`Files don't provided`);


    // files.forEach(async (file) => {
    //   let i = 1;
    //   const fileExtension = file.originalname.split('.');
    //   const key = `${propertyFound.title}_${i}.${fileExtension[fileExtension.length - 1]}`;

    //   await this.fileRepository.save({name: key, property: propertyFound});

    //   await this.client.send(
    //     new PutObjectCommand({
    //       Bucket: process.env.AWS_BUCKET_NAME,
    //       Body: file.buffer,
    //       Key: key
    //     })
    //   )

    //   i++;
    // })

    for(let i=0; i < files.length; i++){
      const fileExtension = files[i].originalname.split('.');
      const key = `${propertyFound.title}_${i+1}.${fileExtension[fileExtension.length - 1]}`;

      await this.fileRepository.save({name: key, property: propertyFound});

      await this.client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: files[i].buffer,
          Key: key
        })
      );
    }

    throw new HttpException('Images uploades successfully', HttpStatus.OK);
  }

  async findAll(id: string) {
    const filesToProperty = await this.fileRepository.find({
      where: {property: {id: id} }
    })

    if(!filesToProperty) throw new NotFoundException(`Files don't found to property`);

    const urls: string[] = [];
    
    filesToProperty.forEach(async (file) => {
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.name
      })

      const url = await getSignedUrl(this.client, command);

      urls.push(url);
    })

    return urls;
  }
}
