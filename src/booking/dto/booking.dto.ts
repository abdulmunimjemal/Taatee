import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class BookingDto {
    @IsInt({ message: 'User ID must be an integer' })
    @IsNotEmpty({ message: 'User ID is required' })
    userId: number;
  }