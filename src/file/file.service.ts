import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class FileService {

  client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_PUBLIC_ACCESS_KEY,
        secretAccessKey: process.env.AWS_PUBLIC_ACCESS_SECRET
    }
  })

  async create(files: Array<Express.Multer.File>, createFileDto: CreateFileDto) {
    const { propertyTitle } = createFileDto;

    for(let i=0; i < files.length; i++){
      const fileExtension = files[i].originalname.split('.');
      const key = `${propertyTitle}_${i+1}.${fileExtension[files.length - 1]}`;

      await this.client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: files[i].buffer,
          Key: key
        })
      )
    }

    return {message: `Images uploades successfully`}
  }

  findAll() {
    return `This action returns all file`;
  }
}
