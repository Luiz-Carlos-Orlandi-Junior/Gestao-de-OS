import { IsEnum, IsOptional } from 'class-validator';
import { ServiceOrderStatus } from '@prisma/client';

export class UpdateServiceOrderDto {
  @IsEnum(ServiceOrderStatus)
  @IsOptional()
  status?: ServiceOrderStatus;
}