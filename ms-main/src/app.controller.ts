import { Controller, Get, Query, Inject, Req, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Request } from 'express';
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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('USER_SERVICE') private readonly client: ClientProxy
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user/info')
  getUserInfo(@Query('id') id): Observable<{ id: number, name: string }> {
    return this.client.send('user:user_info', id);
  }

  @Get('/user/findAll')
  findAll(): Observable<User[]> {
    return this.client.send('user:findAll', 1);
  }

  @Get('/user/findUser')
  findUser(@Req() req: Request): any {
    let authorization = req.get('authorization').replace("Bearer ", "");
    console.log(authorization);
    console.log(req.query);
    return this.client.send('user:findUser', { id: req.query.id ,authorization});
  }

  @Post('/user/login')
  login(@Req() req): any {
    return this.client.send('user:login', req.body);
  }

  @Post('/user/register')
  register(@Req() req): any {
    return this.client.send('user:register', req.body);
  }

}
