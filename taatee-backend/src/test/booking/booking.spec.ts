jest.mock('../booking/booking.service');

describe('-- Booking Controller Tests --', () => {
    let bookingService: BookingService;
    let module: TestingModule;
    let bookingController: BookingController;


    beforeAll(async () => {
        module = await Test.createTestingModule({
          controllers: [BookingController],
          providers: [BookingService],
        }).compile();
    
        bookingService = module.get<BookingService>(BookingService);
        bookingController = module.get<BookingController>(BookingController);
      });
});