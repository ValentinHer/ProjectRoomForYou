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
    private propertyService: PropertyService) { }

  async create(files: Array<Express.Multer.File>, createFileDto: CreateFileDto) {
    const { propertyId } = createFileDto;

    const propertyFound = await this.propertyService.findOne(propertyId);

    if (!files) throw new BadRequestException(`Files don't provided`);

    for (let i = 0; i < files.length; i++) {
      const fileExtension = files[i].originalname.split('.');
      const key = `${propertyFound.title}_${i + 1}.${fileExtension[fileExtension.length - 1]}`;

      await this.fileRepository.save({ name: key, property: propertyFound });

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
    console.log(id)
    const filesToProperty = await this.fileRepository.find({
      where: { property: { id: id } }
    })

    console.log(filesToProperty);

    if (filesToProperty.length == 0) throw new NotFoundException(`Files don't found to property`);

    let urls: string[] = [];

    for (let i = 0; i < filesToProperty.length; i++) {
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filesToProperty[i].name
      })

      const url = await getSignedUrl(this.client, command);

      urls.push(url);
    }

    return urls;
  }
}
