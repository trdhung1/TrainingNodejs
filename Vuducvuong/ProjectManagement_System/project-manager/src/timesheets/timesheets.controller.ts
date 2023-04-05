/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put ,Request} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateTimesheetsDto } from "../dto/create-timesheets.dto";
import { UpdateTimesheetsDto } from "../dto/update-timesheets.dto";
import { Role } from "../role/role.enum";
import { Roles } from "../role/roles.decorator";
import { TimesheetsService } from "./timesheets.service";
@ApiBearerAuth()
@ApiTags('Timesheets')
@Controller('timesheets')
export class TimesheetsController{
    constructor(private readonly TimesheetsSevice : TimesheetsService){}

    @Post()
    async create(@Body() createTimesheetsDto : CreateTimesheetsDto)
    {
        try{
            return await this.TimesheetsSevice.create(createTimesheetsDto);
        }
        catch(err)
        {
            throw new BadRequestException(err.message)
        }
    }

    @Roles(Role.Pm)
    @Get('/listtimesheets')
    async GetTimesheetByPmProject(@Request() req){
        try {
            return await this.TimesheetsSevice.findTimesheetbyPm(req.user._id)
            
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Roles(Role.Admin)
    @Get()
    GetAll(){
        return this.TimesheetsSevice.findAll()
    }

    @Get('/ExportTimeSheetByUser')
    async ExportTimeSheetsByUser(@Request() req ){
    try {
        await this.TimesheetsSevice.fileTimeSheets(req.user._id)
     return 'complete'
    } catch (error) {
        throw new BadRequestException(error.message)
    } 
    }

    @Roles(Role.Pm)     
    @Get(':id')
    GetById(@Param('id') id: string){
        return this.TimesheetsSevice.GetbyId(id);
    }
    @Roles(Role.Pm)
    @Put(':id')
    async update(@Param('id' )id : string , 
    @Request() req,
    @Body() updateTimeSheetsDto: UpdateTimesheetsDto)
    {
        try 
        {
        const timesheet = await this.TimesheetsSevice.findTimesheetbyPm(req.user._id);
        const check = timesheet.some((item)=>{
            return item._id.toString() == id;
        })
        if(!check){
            throw new BadRequestException('not pm of project')
        }
         return await this.TimesheetsSevice.update(id,updateTimeSheetsDto)
        } catch (error) {
            throw new BadRequestException(error.message)
        } 
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async remove(@Param('id')id : string)
    {
        try{
            
            return await this.TimesheetsSevice.remove(id)
        }
        catch(err)
        {
            throw new BadRequestException(err)
        }
        
    }
}