import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthEntity } from './auth/auth.entity';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'newpassword',
    database: 'auth',
    entities: [AuthEntity],
    synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
