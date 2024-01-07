import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from '../event/event.controller';
import { EventService } from '../event/event.service';
import { Event } from '../event/entities';
import { EventDto } from '../event/dto';
import { BookingService } from '../booking/booking.service';
import { Repository } from 'typeorm';
import { UpdateEventDto } from '../event/dto';