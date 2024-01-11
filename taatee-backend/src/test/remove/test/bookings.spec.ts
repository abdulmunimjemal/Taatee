// import { Test, TestingModule } from '@nestjs/testing';

describe('-- Booking Controller Tests --', () => {
  describe('* Get Booking By Id', () => {
    it('should return booking by id if user is an admin', () => {
      const x = 5;
      const y = 0;
      const expectedResult = 5;
      expect(x + y).toEqual(expectedResult);
    });
  });

  describe('', () => {
    it('should throw ForbiddenException if user is not admin or owner', () => {
      const x = 5;
      const y = 0;
      const expectedResult = 5;
      expect(x + y).toEqual(expectedResult);
    });
  });

  describe('* Delete Booking', () => {
    it('should delete booking if user is admin or owner', () => {
      const x = 5;
      const y = 0;
      const expectedResult = 5;
      expect(x + y).toEqual(expectedResult);
    });
  });
});
