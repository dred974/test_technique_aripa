import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.register({
      secret: 'y3xfzFDb5MjDI+McnCJwF1Oj0HY6NRH6zE41Q8OVwyw=',
      signOptions: { expiresIn: '1h'},
    })],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
