import { IsString, IsNotEmpty, IsInt, IsOptional, Min } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  brand!: string;

  @IsString()
  @IsNotEmpty()
  model!: string;

  @IsInt()
  @Min(1900)
  year!: number;

  @IsString()
  @IsNotEmpty()
  plate!: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsNotEmpty()
  fipe_code!: string;

  @IsInt()
  customerId!: number;
}