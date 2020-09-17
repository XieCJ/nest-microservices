import { Controller, Get, Query, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
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
  findUser(@Query('id') id): any {
    return this.client.send('user:findUser', id);
  }

}
