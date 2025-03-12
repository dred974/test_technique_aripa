import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) {}

    @Post('register')
    async register(@Body() body: {name: string; email: string; password: string}) {
        const existingUser = await this.authService.findByEmail(body.email)
        if (existingUser) {
            throw new BadRequestException('Email already exists')
        }

        const user = await this.authService.createUser(body.name, body.email, body.password)
        return { message: 'User registered successfully', userId: user.id}
    }

    @Post('login')
    async login(@Body() body: {email: string; password: string}) {
        const user = await this.authService.findByEmail(body.email);
        if (!user || !(await bcrypt.compare(body.password, user.password))) {
            throw new BadRequestException('Invalid credentials');
        }
        const token = this.jwtService.sign({ id: user.id, email: user.email });
        return { message: 'Login successful', token };
    }
}
