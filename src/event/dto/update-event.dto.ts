// event.dto.ts
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Event } from '../entities';

export class UpdateEventDto extends PartialType(OmitType(Event, ['id'] as const)) {}
