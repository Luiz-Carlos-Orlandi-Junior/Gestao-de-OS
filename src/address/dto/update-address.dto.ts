import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateAddressDto {

  @IsString()
  @IsOptional()
  street?: string

  @IsString()
  @IsOptional()
  number_house?: string

  @IsString()
  @IsOptional()
  complement?: string

  @IsString()
  @IsOptional()
  neighborhood?: string

  @IsString()
  @IsOptional()
  city?: string

  @IsString()
  @IsOptional()
  state?: string

  @IsString()
  @IsOptional()
  zip_code?: string
}