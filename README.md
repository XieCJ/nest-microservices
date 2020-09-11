# nest-microservices
## 创建项目

1、`nest new ms-main`

2、`cd ms-main`

3、`npm i --save @nestjs/microservices`

4、`nest new ms-user`

5、`cd ms-user`

6、`npm i --save @nestjs/microservices`

## ms-main

app.controller.ts

```
import { Controller, Get, Query ,Inject} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
```

app.controller.ts

```javascript
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('USER_SERVICE') private client: ClientProxy
  ) { }

  @Get('/user/info')
  getUserInfo(@Query('id') id): Observable <{ id: number, name: string }> {
    return this.client.send('user:user_info',id);
  }
}
```

app.module.ts

`import { ClientsModule, Transport } from '@nestjs/microservices';`

```javascript
imports: [
    ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.TCP },
    ]),
 ],
```

## ms-user

main.ts

`import { Transport, MicroserviceOptions } from '@nestjs/microservices';`

```javascript
 const app = await NestFactory.createMicroservice<MicroserviceOptions>(

  AppModule,

  {

   transport: Transport.TCP,

  },

 );

 app.listen(() => console.log('Microservice is listening'));

}

bootstrap();
```

app.controller.ts

`import { MessagePattern} from '@nestjs/microservices';`

```javascript
 @MessagePattern('user:user_info')
  wordCount(id: string): {id: number,name: string} {
    return this.appService.getUserInfo(id);
  }
```

app.service.ts

```
 getUserInfo(id: string) {
    console.log("ms-user_app.service");
    return {id: 1,name: "张三"};
 }
```

`npm start`启动

打开浏览器输入:http://localhost:3000/user/info?id=1

然后就可以看到返回的消息了