// event.dto.ts
import { OmitType } from '@nestjs/mapped-types';
import { Event } from '../entities';

export class EventDto extends OmitType(Event, ['id'] as const) {}