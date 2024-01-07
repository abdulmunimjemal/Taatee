import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Patch } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './entities';
import { JwtGuard } from '../auth/guard/';
import { Roles } from '../auth/decorator/';
import { Role } from '../auth/role/';
import { RoleGuard } from '../auth/guard';
import { EventDto } from './dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @Get(':id')
  async getEventById(@Param('id') id: number){
    return this.eventService.getEventById(id);
  }

  @Post()
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.Admin)
  createEvent(@Body() eventDto: EventDto): void {
    this.eventService.createEvent(eventDto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.Admin)
  updateEvent(@Param('id') id: number, @Body() updatedEvent: Event): void {
    this.eventService.updateEvent(id, updatedEvent);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.Admin)
  deleteEvent(@Param('id') id: number): void {
    this.eventService.deleteEvent(id);
  }
}
