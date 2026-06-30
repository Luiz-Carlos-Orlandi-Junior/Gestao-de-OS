import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateVehicleDto {
 @IsString()
 @IsOptional()
color?: string;
}