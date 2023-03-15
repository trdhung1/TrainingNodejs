/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common/decorators";
import { MongooseModule } from "@nestjs/mongoose";
import { Project, ProjectSchema } from "src/schema/project.schema";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Project.name,
            schema: ProjectSchema
        }
    ])
    ],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule { }