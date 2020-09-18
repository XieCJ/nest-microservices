import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { getSalt, encryptPassword } from '../../utils/cryptogram';

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

  @MessagePattern('user:login')
  async login(accountName: string) {
    let a = await this.userService.getUserByName(accountName);
    console.log(accountName, "login", a);
    return a;
  }

  @MessagePattern('user:register')
  async register(body: any) {
    const { accountName, passwd } = body;
    let user = await this.userService.getUserByName(accountName);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    };
    body.passwdSalt = getSalt();
    body.passwd = encryptPassword(passwd, body.passwdSalt);  // 加密密码
    try {
      await this.userService.addUser(body);
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
    return {
      code: 200,
      msg: 'Success',
    };
  }

}
