import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  ValidationPipe,
  UsePipes,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Role } from './decorators/role/role.decorator';
import { CreateCatDto } from './dto/create-cat.dto';
import { RoleGuard } from './guard/role/role.guard';
import { LoggingInterceptor } from './interceptors/logging/logging.interceptor';
import { CustomPipe } from './pipe/custom/custom.pipe';

@Controller('cats')
// @UseGuards(RoleGuard)
// @UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  findAll() {
    return this.catsService.findAll();
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  @Post()
  @Role('ADMIN')
  create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
  }
  @Get(':id')
  findOne(@Param('id', CustomPipe) id: number) {
    console.log(typeof id);
    console.log(id);
  }
  @Get('/error')
  showError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
