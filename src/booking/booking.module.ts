import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities';
import { EventService } from '../event/event.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    EventService,
    UserService
  ],
  providers: [BookingService],
  controllers: [BookingController]
})
export class BookingModule {}
