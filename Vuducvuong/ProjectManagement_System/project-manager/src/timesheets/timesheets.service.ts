/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { generateClientRequestIdPolicy } from "@azure/core-http";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTimesheetsDto } from "../dto/create-timesheets.dto";
import { UpdateTimesheetsDto } from "../dto/update-timesheets.dto";
import { Project, ProjectDocument } from "../schema/project.schema";
import { Timesheets, TimesheetsDocument } from "../schema/timesheets.schema";
import * as xlsx from 'xlsx';
import { StatusTimesheets } from "src/enum/status-timesheets.enum";
import { WorkingType } from "src/enum/working-type.enum";
@Injectable()
export class TimesheetsService {
    constructor(
        @InjectModel(Timesheets.name)
        private readonly timesheetsModel: Model<TimesheetsDocument>,
         @InjectModel(Project.name)
        private readonly projectModel : Model<ProjectDocument>
    ) { }

    public async create(createTimeSheetsDto: CreateTimesheetsDto): Promise<TimesheetsDocument> {
            const timesheets = new this.timesheetsModel({
                ...createTimeSheetsDto,
                status:StatusTimesheets.Pennding,
            });
            if(timesheets.workingtype == WorkingType.NormalWorkingHours)
            {
                timesheets.hours = 8;
            }
            await timesheets.populate('projectId');
            await timesheets.populate('userId')
            return timesheets.save();
    }

    public async fileTimeSheets(id: string) {
        try {
            const data = await this.timesheetsModel.find({ userId: id },{__v : 0}).lean();
            const ressulft = data.map(item => ({
                ...item,
                _id: item._id.toString(),
                userId: item.userId.toString(),
                projectId: item.projectId.toString(),
            }))
            if (!data) {
                throw new BadRequestException('no data')
            }
            // Create a new workbook and worksheet
            const worksheet = xlsx.utils.json_to_sheet(ressulft);

            const workbook = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(workbook, worksheet, 'timesheet');
            xlsx.writeFile(
                workbook,
                'C:\\Users\\PC\\Downloads\\timesheet.xlsx'
            );
        } catch (error) {
            console.log(error)
        }
    }

    public async findTimesheetbyPm(id: string){
        const project = await this.projectModel.find({projectManager: id})
        if(!project)
        {
         throw new BadRequestException('not pm of any project')
        }
        const timesheet = await this.timesheetsModel.find({projectId : project.map(item=> item._id)}).lean()
        return timesheet
    }


    public async findAll(): Promise<TimesheetsDocument[]> {
        return await this.timesheetsModel.find().populate('projectId').populate('userId')
    }

    public async GetbyId(id: string) {
        try {
            const timesheets = await this.timesheetsModel.findOne({ _id: id })
            return timesheets;
        }
        catch (err) {
            throw new BadRequestException(err.message, { cause: new Error(), description: 'wrong id' })
        }
    }

    public async update(id: string, updateTimeSheetsDto: UpdateTimesheetsDto): Promise<TimesheetsDocument> {
        try {
            
            const timesheet= await this.timesheetsModel.findOne({ _id: id })
            timesheet.status = updateTimeSheetsDto.status;
            return timesheet.save()
        }
        catch (err) {
            throw new BadRequestException(err.messgae, { cause: new Error(), description: 'wrong id' })
        }
    }

    public async remove(id: string) {
        try {
            return await this.timesheetsModel.findByIdAndRemove(id);
        } catch (err) {
            throw new BadRequestException('wrong id')

        }
    }
}
