import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
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
    private readonly userService: UserService,
    private readonly authService: AuthService
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

  @UseGuards(AuthGuard('jwt'))
  @MessagePattern('user:findUser')
  async findUser(data) {
    console.log(data);
    let a = await this.userService.findOne(data.id);
    console.log(data.id, "user:findUser", a);
    return a;
  }

  @MessagePattern('user:login')
  async login(body: any) {
    const { accountName, passwd } = body;
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(accountName, passwd);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  @UseGuards(AuthGuard('jwt'))
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
