// Don't forget to review this code and edit

import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from '../booking/booking.controller';
import { BookingService } from '../booking/booking.service';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Role } from '../auth/role';
import { Roles } from '../auth/decorator';
import { ForbiddenException } from '@nestjs/common';

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



      afterEach(() => {
        jest.resetAllMocks();
      });
    
      // ---------------- Get Booking By Id ---------------------
      describe('* Get Booking By Id', () => {
        it('should return booking by id if user is an admin', async () => {
          const expectedResult = {}; // Mock the expected result as needed
          jest
            .spyOn(bookingService, 'getBookingById')
            .mockResolvedValue(expectedResult);
    
          const mockRequest = {
            user: {
              role: Role.Admin,
            },
          };
    
          expect(await bookingController.getBookingById(1, mockRequest)).toBe(
            expectedResult,
          );
        });
    
        it('should return booking by id if user is the owner', async () => {
          const expectedResult = {}; // Mock the expected result as needed
          jest
            .spyOn(bookingService, 'getBookingById')
            .mockResolvedValue(expectedResult);
    
          const mockRequest = {
            user: {
              role: Role.User,
              id: 1, // Assuming the user id
            },
          };
    
          expect(await bookingController.getBookingById(1, mockRequest)).toBe(
            expectedResult,
          );
        });
    
        it('should throw ForbiddenException if user is not admin or owner', async (done) => {
          // Mock the service method to simulate a failure
          jest
            .spyOn(bookingService, 'getBookingById')
            .mockResolvedValue({ user: { id: 2 } });
    
          const mockRequest = {
            user: {
              role: Role.User,
              id: 1, // Assuming the user id
            },
          };



          // ---------------- Delete Booking ---------------------
  describe('* Delete Booking', () => {
    it('should delete booking if user is admin or owner', async () => {
      const expectedResult = {}; // Mock the expected result as needed
      jest
        .spyOn(bookingService, 'deleteBooking')
        .mockResolvedValue(expectedResult);

      const mockRequest = {
        user: {
          role: Role.Admin,
        },
      };

      expect(await bookingController.deleteBooking(1, mockRequest)).toBe(
        expectedResult,
      );
    });

    it('should throw ForbiddenException if user is not admin or owner', async (done) => {
      // Mock the service method to simulate a failure
      jest
        .spyOn(bookingService, 'deleteBooking')
        .mockResolvedValue({ user: { id: 2 } });

      const mockRequest = {
        user: {
          role: Role.User,
          id: 1, // Assuming the user id
        },
      };

});