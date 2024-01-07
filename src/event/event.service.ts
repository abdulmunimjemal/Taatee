import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Event } from './entities';
import { EventDto, UpdateEventDto } from './dto';

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
    const event =  await this.eventRepository.findOne({
    where: {
        id: id,
    }
    }); 
    if (!event) {
      throw new NotFoundException(`Event With id ${id} is not found.`);
    }
    return event;
  }

  createEvent(event: EventDto): Promise<Event> {
    const result = this.eventRepository.save(event);
    if (!result) {
      throw new BadRequestException("Error Creating Event");
    }
    
    return result;
  }

  async updateEvent(id: number, updatedEvent: UpdateEventDto): Promise<Event> {
    const existingEvent =  await this.getEventById(id)

    if (!existingEvent) {
      throw new NotFoundException(`Event with ID #${id} is not found.`)
    }

    Object.assign(existingEvent, updatedEvent)
    const result = await this.eventRepository.save(existingEvent)

    if (!result) {
      throw new BadRequestException("Bad Request!");
    }
    
    return existingEvent;
  }

  deleteEvent(id: number): Promise<void> {
    const event = this.eventRepository.delete(id);
    if (!event) {
      throw new NotFoundException(`Deletion Failed.`);
    }
    return undefined;
  }
}
