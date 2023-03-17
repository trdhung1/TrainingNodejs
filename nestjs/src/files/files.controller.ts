import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/auth.decorator';
import { MembersService } from 'src/members/members.service';
import * as xlsx from 'xlsx';

@Controller('files')
export class FilesController {
  constructor(private membersService: MembersService) {}
  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        // validators: [
        //   new MaxFileSizeValidator({ maxSize: 10000 }),
        //   new FileTypeValidator({ fileType: 'image/jpeg' }),
        // ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const workbook = xlsx.read(file.buffer);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const members = await this.membersService.findAll();
    const emailList = members.map((member) => member.email);

    const newData = data.filter((user: any) => !emailList.includes(user.email));
    return newData;
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
