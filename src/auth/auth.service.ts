import { Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './dto';

// we will use SQLite as our database
@Injectable()
export class AuthService {

    constructor(
        // private readonly usersService: UsersService,
        // private readonly jwtService: JwtService,
    ) {}

    async signup(signupDto: SignupDto) {
        // Logic to create user
        
    }

    async signin(signinDto: SigninDto) {
        // Logic to sign user in
    }
}
