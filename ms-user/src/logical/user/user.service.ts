import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  getUserInfo(id: string) {
    console.log("ms-user_app.service", id);
    return { id: 1, name: "张三" };
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  getUserByName(accountName: string) {
    return this.usersRepository.findOne({ accountName });
  }

  async addUser(user: User) {
    return await this.usersRepository.insert(user);
  }

}
