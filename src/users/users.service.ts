import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Role } from './role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepo.find();
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const role = await this.roleRepo.find({
      where: { name: createUserDto.role },
    });
    const user = this.userRepo.create({ ...createUserDto, roles: role });
    return this.userRepo.save(user);
  }

  async getById(id: number): Promise<User> {
    return this.userRepo.findOne({ where: { id: id } });
  }
  async getByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({
      where: { email: email },
      relations: ['roles'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepo.update(id, updateUserDto);
    return this.userRepo.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
