import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}
  create(createAccountDto: CreateAccountDto) {
    console.log(createAccountDto);
    const account = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async getById(id: number): Promise<Account> {
    return this.accountRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
    await this.accountRepository.update(id, updateAccountDto);
    return this.accountRepository.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    await this.accountRepository.delete(id);
  }
}
