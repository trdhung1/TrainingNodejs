/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTimesheetsDto } from "src/dto/create-timesheets.dto";
import { UpdateTimesheetsDto } from "src/dto/update-timesheets.dto";
import { Timesheets, TimesheetsDocument } from "src/schema/timesheets.schema";

@Injectable()
export class TimesheetsService{
    constructor(
        @InjectModel(Timesheets.name)
        private readonly timesheetsModel : Model<TimesheetsDocument>
    ){}

    public async create(createTimeSheetsDto : CreateTimesheetsDto): Promise<TimesheetsDocument>{
        const timesheets = new this.timesheetsModel({
            ...createTimeSheetsDto,
          });
          await timesheets.populate('projectId');
          await timesheets.populate('userId')
          return  timesheets.save();
        }

    public async findAll():Promise<TimesheetsDocument[]>{
        return await this.timesheetsModel.find().populate('projectId').populate('userId')
    }
    
    public async GetbyId(id : string )
    {
        try{
            const timesheets = await this.timesheetsModel.findOne({_id : id})
            return timesheets;
        }
        catch(err)
        {
            throw new BadRequestException(err.message,{cause : new Error(),description:'wrong id'})
        }
    }

    public async update(id:string ,  updateTimeSheetsDto : UpdateTimesheetsDto):Promise<TimesheetsDocument>
    {
        try{
            await this.timesheetsModel.findByIdAndUpdate(id,updateTimeSheetsDto)
            return this.timesheetsModel.findOne({_id : id})
        }
        catch(err)
        {
            throw new BadRequestException(err.messgae,{cause: new Error(),description: 'wrong id'})
        }
    }

    public async remove(id: string){
        try{
            await this.timesheetsModel.findByIdAndRemove(id)
        }
        catch(err)
        {
            throw new BadRequestException(err.message)
        }
    }
}
