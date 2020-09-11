import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUserInfo(id: string) {
    console.log("ms-user_app.service", id);
    return { id: 1, name: "张三" };
  }

}
