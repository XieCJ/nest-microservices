import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
interface User {
  id: number;
  accountName: string;
  realName: string;
  passwd: string;
  passwdSalt: string;
  moblie: string;
  role: number;
  userStatus: number;
  createBy: number;
  createTime: Date;
  updateBy: number;
  updateTime: Date;
}


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @MessagePattern('user:user_info')
  getUserInfo(id: string): { id: number, name: string } {
    console.log("所有用户", this.userService.findAll());
    return this.userService.getUserInfo(id);
  }

  @MessagePattern('user:findAll')
  async findAll() {
    console.log("user:findAll");
    return await this.userService.findAll();
  }

  @MessagePattern('user:findUser')
  async findUser(id: number) {
    let a = await this.userService.findOne(id);
    console.log(id, "user:findUser", a);
    return a;
  }

}
