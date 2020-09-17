import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import dbConfig from './config/db';
import { User } from './logical/user/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: dbConfig.mysql.host,
      port: dbConfig.mysql.port,
      username: dbConfig.mysql.username,
      password: dbConfig.mysql.password,
      database: dbConfig.mysql.database,
      entities: [User],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
}
