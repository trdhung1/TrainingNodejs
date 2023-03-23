/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { IsDateString } from 'class-validator';
export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @IsDateString()
    createDate: Date;

    @IsDateString()
    endDate: Date;
}
