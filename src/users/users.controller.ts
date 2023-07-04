import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { Public } from "src/auth/auth.guard";


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}

