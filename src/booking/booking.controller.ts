import { Controller, UseGuards, Post, Body, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Role } from 'src/auth/role';
import { Roles } from 'src/auth/decorator';
import { BookingDto } from './dto'


@Controller('book')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService
    ) {}
    
    @Post(':eventId')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.User)
    async createBooking(
        @Param('eventId') eventId: string,
        @Body() bookingDto: BookingDto
    ) {
        return this.bookingService.createBooking(eventId, bookingDto);
    }
}
