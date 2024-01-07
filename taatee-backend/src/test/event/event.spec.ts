import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from '../event/event.controller';
import { EventService } from '../event/event.service';
import { Event } from '../event/entities';
import { EventDto } from '../event/dto';
import { BookingService } from '../booking/booking.service';
import { Repository } from 'typeorm';
import { UpdateEventDto } from '../event/dto';

jest.mock('../event/event.service');
jest.mock('../event/dto');

describe('-- Event Testings --', () => {
    let eventService: EventService;
    let module: TestingModule;
    let eventController: EventController;
    let eventDto: EventDto;


    beforeAll(async () => {
        module = await Test.createTestingModule({
          controllers: [EventController],
          providers: [EventService, BookingService /*BookingModule*/, EventDto],
        }).compile();
        eventService = module.get<EventService>(EventService);
        eventController = module.get<EventController>(EventController);
        eventDto = module.get<EventDto>(EventDto);
      });
      afterEach(() => {
        jest.resetAllMocks();
      });

      // ----------------------Get----------------------------
  describe('* Get One By Id', () => {
    it('should return an entity of event if successful', async () => {
      const expectedResult = new Event();
      const mockNumberToSatisfyParameters = 0;
      jest
        .spyOn(eventService, 'getEventById')
        .mockResolvedValue(expectedResult);
      expect(
        await eventController.getEventById(mockNumberToSatisfyParameters),
      ).toBe(expectedResult);
    });
  });
}

