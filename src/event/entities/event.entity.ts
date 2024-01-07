import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Booking } from '../../booking/entities/'; // Assuming you create a Booking entity

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventName: string;

  @Column({ type: 'timestamp' })
  eventDate: Date;

  @Column()
  location: string;

  @Column({ default: false })
  isCanceled: boolean;

  @OneToMany(() => Booking, booking => booking.event)
  bookings: Booking[];
}
