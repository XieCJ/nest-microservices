import { Controller, Get, Query, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

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

}
