import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
    secret: 'pass123',
    signOptions: {
        expiresIn: '1h',
    },
};