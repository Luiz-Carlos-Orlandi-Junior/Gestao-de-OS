import { IsEnum } from 'class-validator';
import { VehicleType } from '../enums/vehicle-type.enum';

export class VehicleTypeParamsDto {
  @IsEnum(VehicleType)
  vehicleType!: VehicleType;
}