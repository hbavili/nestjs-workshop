import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import * as fs from 'fs';
import * as path from 'path';


@Controller('account')
@ApiBearerAuth()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @SetMetadata('roles', ['READ']) // Define the required roles for this route
  @UseGuards(RolesGuard)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const uploadPath = path.join(__dirname, '..', '..', 'uploads'); // Define the upload path

    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, file.originalname); // Define the file path
    fs.writeFileSync(filePath, file.buffer); // Save the file to the defined path

    console.log('File saved:', filePath);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
