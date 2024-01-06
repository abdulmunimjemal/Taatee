import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    
    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { email: email },
          } as FindOneOptions<User>);
    }

    async findOne(id: number): Promise<User | undefined> {
        const user = await this.userRepository.findOne({
            where: { id: id },
          } as FindOneOptions<User>);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        delete user.password
        delete user.isAdmin
        return user;
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async update(id: number, updateUserDto: Partial<User>): Promise<User> {
        // Logic to update a user
        const existingUser = await this.findOne(id);

        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Update user fields
        Object.assign(existingUser, updateUserDto);

        await this.userRepository.save(existingUser);
        
        // Return the updated user without the password
        const { password, ...updatedUser } = existingUser;
        return {...updatedUser, password: "*******"};
    }

    async remove(id: number): Promise<void> {
        // Logic to remove a user
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        await this.userRepository.remove(user);
    }
}
