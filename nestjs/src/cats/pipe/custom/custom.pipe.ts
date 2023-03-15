import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class CustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const transformedValue = parseInt(value, 10);
    console.log('Custom pipe');

    if (isNaN(transformedValue)) {
      throw new BadRequestException('Cannot transform input data to number');
    }
    return transformedValue;
  }
}
