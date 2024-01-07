import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Event } from './entities';
import { EventDto } from './dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  getAllEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async getEventById(id: number): Promise<Event> {
    return await this.eventRepository.findOne({
    where: {
        id: id,
    }
    }); 
  }

  createEvent(event: EventDto): Promise<Event> {
    return this.eventRepository.save(event);
  }

  updateEvent(id: number, updatedEvent: Event): Promise<Event> {
    return this.eventRepository.save({ ...updatedEvent, id });
  }

  deleteEvent(id: number): Promise<void> {
    return this.eventRepository.delete(id).then(() => undefined);
  }
}
