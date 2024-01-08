import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities';
import { Repository } from 'typeorm';
import { EventService } from '../event/event.service';
import { BookingDto } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        private readonly eventService: EventService,
        private readonly userService: UserService,
    ) {}

    async createBooking(eventId: number, bookingDto: BookingDto): Promise<Booking> {
        const event = await this.eventService.getEventById(eventId);

        if (!event) {
            throw new NotFoundException(`Event with ID #${eventId} not found`);
        }

        if (event.isCanceled) {
            throw new BadRequestException("Event is canceled. Bookings are not allowed!");
        }

        if (event.maxBooking !== null && event.maxBooking <= event.bookings.length) {
            throw new BadRequestException("Event is fully booked!");
        } 

        const user = await this.userService.findOne(bookingDto.userId);

        if (!user) {
            throw new NotFoundException(`User with ID #${bookingDto.userId} not found`);
        }

        const existingBooking = await this.bookingRepository.findOne({
            where: { event: event, user: user }
        })

        if (!existingBooking) {
            throw new BadRequestException("Booking already exists")
        }

        const newBooking = this.bookingRepository.create({
            event: event,
            user: user,
            bookingDate: new Date()
        });

        return this.bookingRepository.save(newBooking);
    }
}
