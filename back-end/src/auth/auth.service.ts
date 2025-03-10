import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthEntity) private usersRepository: Repository<AuthEntity>
    ) {}

    async findByEmail(email: string): Promise<AuthEntity | null> {
        return this.usersRepository.findOne({where: {email}})
    }

    async createUser(name: string, email: string, password: string): Promise<AuthEntity> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user  = this.usersRepository.create({name, email, password: hashedPassword})
        return this.usersRepository.save(user)
    }
}
