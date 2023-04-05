/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common/decorators";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectModule } from "../project/project.module";
import { Project, ProjectSchema } from "../schema/project.schema";
import { Timesheets, TimeSheetsSchema } from "../schema/timesheets.schema";
import { TimesheetsController } from "./timesheets.controller";
import { TimesheetsService } from "./timesheets.service";


@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Timesheets.name,
            schema: TimeSheetsSchema
        },
        {
            name: Project.name,
            schema: ProjectSchema
        }
        
    ]), ProjectModule
    ],
    controllers: [TimesheetsController],
    providers: [TimesheetsService],
})
export class TimeSheetsModule { }