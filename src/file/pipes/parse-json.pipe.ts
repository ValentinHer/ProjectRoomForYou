import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseJsonPipe implements PipeTransform<string, object>{
    transform(value: string, metadata: ArgumentMetadata): object {
        return JSON.parse(value);
    }
}