import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/auth/role/role.enum';
import { UpdateUserDto } from './dto';
import { BookingService } from '../booking/booking.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly bookingService: BookingService,
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
        if (user.role != Role.Admin)
            delete user.role
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
        return { ...updatedUser, password: "*******" };
    }
    
    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        return this.update(id, updateUserDto);
    }
    
    async updateSelf(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        // Check if the update request contains a role change
        if ('role' in updateUserDto) {
            throw new ForbiddenException(`You are not authorized to change your own role`);
        }
        return this.update(id, updateUserDto);
    }

    async remove(id: number): Promise<void> {
        // Logic to remove a user
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        // Remove bookings associated with the user too
        await this.bookingService.deleteAllForUser(user);

        await this.userRepository.remove(user);
    }
}
