import { Controller, UseGuards, Param, Get, Req, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Role } from 'src/auth/role';
import { Roles } from 'src/auth/decorator';
import { Booking } from './entities';

@Controller('booking')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService,
    ) {}

    @Get()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.Admin)
    getAllBookings(): Promise<Booking[]> {
    return this.bookingService.getAllBookings();
    }

    @Get(":id")
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.User)
    @Roles(Role.Admin)
    async getBookingById(
        @Param('id') id: number
    ) {
        return this.bookingService.getBookingById(id);
    } 

    @Delete(':id')
    @UseGuards(JwtGuard, RoleGuard)
    async deleteBooking(@Param('id') bookingId: number, @Req() request) {
        const user = request.user
        return this.bookingService.deleteBooking(bookingId, user);
    }
}