/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateTimesheetsDto } from "src/dto/create-timesheets.dto";
import { UpdateTimesheetsDto } from "src/dto/update-timesheets.dto";
import { Role } from "src/role/role.enum";
import { Roles } from "src/role/roles.decorator";
import { TimesheetsService } from "./timesheets.service";

@Controller('timesheets')
export class TimesheetsController{
    constructor(private readonly TimesheetsSevice : TimesheetsService){}

    @Post()
    create(@Body() createTimesheetsDto : CreateTimesheetsDto)
    {
        return this.TimesheetsSevice.create(createTimesheetsDto);
    }

    @Get()
    GetAll(){
        return this.TimesheetsSevice.findAll()
    }

    @Get('/findByUser')
    ExportTimeSheetsByUser(@Body() id: string){
        return this.TimesheetsSevice.findTimeSheets(id)
    }

    @Get(':id')
    GetById(@Param('id') id: string){
        return this.TimesheetsSevice.GetbyId(id);
    }
    
    @Roles(Role.Pm)
    @Put(':id')
    update(@Param('id' )id : string , 
    @Body() updateTimeSheetsDto: UpdateTimesheetsDto)
    {
        return this.TimesheetsSevice.update(id,updateTimeSheetsDto)
    }

    @Delete(':id')
    remove(@Param('id')id : string)
    {
        this.TimesheetsSevice.remove(id)
        return 'delete succsesfull'
    }
}