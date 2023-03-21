import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Get,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Public, Role, Roles } from 'src/auth/decorators/auth.decorator';
import { MembersService } from 'src/members/members.service';
import * as xlsx from 'xlsx';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private membersService: MembersService) {}

  @ApiOperation({ summary: 'add members from excel file' })
  @ApiBody({
    description: 'List of members',
    type: FileUploadDto,
  })
  @Roles(Role.ADMIN)
  @Post('upload/excel')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const workbook = xlsx.read(file.buffer);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    return this.membersService.createManyMember(data);
  }

  @ApiOperation({ summary: 'write all members to excel file' })
  @Roles(Role.ADMIN)
  @Get('upload/excel')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async getFile() {
    const members = await this.membersService.findAll();
    const workbook = xlsx.utils.book_new();

    // Create a new worksheet
    const worksheet = xlsx.utils.json_to_sheet(members);

    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook to a file

    return xlsx.writeFile(
      workbook,
      'C:\\Users\\admin\\Downloads\\members.xlsx',
    );
  }

  //   @Public()
  //   @Post('uploads')
  //   @UseInterceptors(FileInterceptor('files'))
  //   uploadFiles(
  //     @UploadedFiles()
  //     files: Array<Express.Multer.File>,
  //   ) {
  //     console.log(files);
  //   }

  @Public()
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
