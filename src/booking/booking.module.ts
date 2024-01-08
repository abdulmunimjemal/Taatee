import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities';
import { EventModule } from '../event/event.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    EventModule,
    UserModule,
  ],
  providers: [BookingService],
  controllers: [BookingController]
})
export class BookingModule {}
