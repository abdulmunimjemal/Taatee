import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const salt = 10;

// we will use SQLite as our database
@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async signup(signupDto: SignupDto) {
        // Logic to create user
        const userExists = await this.userRepository.findOne({
            where: { email: signupDto.email },
          } as FindOneOptions<User>);

        if (userExists) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        signupDto.isAdmin = false;
        signupDto.password = await bcrypt.hashSync(signupDto.password, salt);


        const user = this.userRepository.create(signupDto);
        if (!user) {
            throw new HttpException('Error Creating User!', HttpStatus.BAD_REQUEST);
        }
        const result = this.userRepository.save(user);   
        delete (await result).password
        delete (await result).isAdmin
        const accessToken = this.jwtService.sign({ email: signupDto.email });
        return {access_token: accessToken, user: await result};
    }

    async signin(signinDto: SigninDto) {
        // Logic to sign user in
        const user = await this.userRepository.findOne({
            where: { email: signinDto.email },
          } as FindOneOptions<User>);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const isPasswordValid = await bcrypt.compare(signinDto.password, user.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
        }
        delete user.password
        delete user.isAdmin
        const accessToken = this.jwtService.sign({ email: signinDto.email });
        return {access_token: accessToken};
    }
}
