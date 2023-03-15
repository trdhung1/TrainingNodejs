/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common/decorators";
import { MongooseModule } from "@nestjs/mongoose";
import { Timesheets, TimeSheetsSchema } from "src/schema/timesheets.schema";
import { TimesheetsController } from "./timesheets.controller";
import { TimesheetsService } from "./timesheets.service";


@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Timesheets.name,
            schema: TimeSheetsSchema
        }
    ])
    ],
    controllers: [TimesheetsController],
    providers: [TimesheetsService],
})
export class TimeSheetsModule { }