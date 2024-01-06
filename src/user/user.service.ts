import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    
    async findOneByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email: email },
          } as FindOneOptions<User>);
        return user;
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne(id as FindOneOptions<User>);
        return user;
    }

    async findAll() {
        // Logic to find all users
    }

    async update() {
        // Logic to update a user
    }

    async remove() {
        // Logic to remove a user
    }

}
