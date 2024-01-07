import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './auth/jwt/jwt.config';
import { SeederService } from './seeder/seeder.service';

@Module({
  imports: [AuthModule, UserModule, EventModule, BookingModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register(jwtConfig),
  ],
 providers: [SeederService],
})
export class AppModule {}
