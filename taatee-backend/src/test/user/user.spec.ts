import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../user/user.controller';
import { UserService } from '../../user/user.service';
import { BookingService } from '../../booking/booking.service';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { RoleGuard } from '../../auth/guard';
import { UpdateUserDto } from '../../user/dto';
import { Role } from '../../auth/role';
import { Roles } from '../../auth/decorator';

jest.mock('../user/user.service');
jest.mock('../booking/booking.service');

describe('-- User Controller Testings --', () => {
  let userController: UserController;
  let userService: UserService;
  let bookingService: BookingService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, BookingService],
    })
      .overrideGuard(JwtGuard)
      .useValue({ canActivate: () => true }) // Mocking JwtGuard
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true }) // Mocking RoleGuard
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    bookingService = module.get<BookingService>(BookingService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* Get User by ID', () => {
    it('should return a user if successful', async () => {
      const expectedResult = {}; // Modify as needed based on your implementation
      jest.spyOn(userService, 'findOne').mockResolvedValue(expectedResult);
      expect(await userController.getUserById(1)).toBe(expectedResult);
    });
  });

  describe('* Get User Bookings', () => {
    it('should return user bookings if successful', async () => {
      const expectedResult = {}; // Modify as needed based on your implementation
      jest.spyOn(userService, 'findOne').mockResolvedValue({});
      jest
        .spyOn(bookingService, 'getAllBookingsForUser')
        .mockResolvedValue(expectedResult);
      expect(await userController.getBookings(1)).toBe(expectedResult);
    });
  });

  describe('* Update User', () => {
    it('should update a user if successful', async () => {
      const mockUserId = 1;
      const updateUserDto: UpdateUserDto = {};
      const expectedResult = {}; // Modify as needed based on your implementation

      jest.spyOn(userService, 'updateUser').mockResolvedValue(expectedResult);

      const result = await userController.updateUser(mockUserId, updateUserDto);
      expect(result).toBe(expectedResult);
    });
  });

  describe('* Delete User', () => {
    it('should delete a user if successful', async () => {
      const mockUserId = 1;
      const expectedResult = {}; // Modify as needed based on your implementation

      jest.spyOn(userService, 'remove').mockResolvedValue(expectedResult);

      const result = await userController.deleteUser(mockUserId);
      expect(result).toBe(expectedResult);
    });
  });
});
