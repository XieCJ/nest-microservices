import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { UserController } from './logical/user/user.controller';
import { UserService } from './logical/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import dbConfig from './config/db';
import { User } from './logical/user/user.entity';
import { AuthService } from './logical/auth/auth.service';
import { AuthModule } from './logical/auth/auth.module';


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
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {
}
