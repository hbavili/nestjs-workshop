import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateProjectDto } from "../project/dto/update-project.dto";
import { Roles } from "../auth/roles.guard";
import { rolesEnum } from "../auth/constant";


@Controller('account')
@ApiBearerAuth()
@ApiTags('Account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @Roles(rolesEnum.READ)
  @Roles(rolesEnum.WRITE)
  @Roles(rolesEnum.ADMIN)
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  @Roles(rolesEnum.READ)
  @Roles(rolesEnum.WRITE)
  @Roles(rolesEnum.ADMIN)
  findOne(@Param('id') id: string) {
    return this.accountService.getById(+id);
  }

  @Patch(':id')
  @Roles(rolesEnum.WRITE)
  @Roles(rolesEnum.ADMIN)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.accountService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @Roles(rolesEnum.ADMIN)
  remove(@Param('id') id: string) {
    return this.accountService.delete(+id);
  }
}
