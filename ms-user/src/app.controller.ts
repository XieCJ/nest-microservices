import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('user:user_info')
  getUserInfo(id: string): {id: number,name: string} {
    return this.appService.getUserInfo(id);
  }

  @EventPattern('math:wordcount_log')
  wordCountLog(text: string): void {
    console.log("wordcount_log:", text);
  }
}
