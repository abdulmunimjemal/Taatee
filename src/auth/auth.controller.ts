import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SigninDto, SignupDto } from './dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return await this.authService.signup(signupDto);
    }

    @Post('signin')
    async signin(@Body() signinDto: SigninDto) {
        return await this.authService.signin(signinDto);
    }
}
