import { IsString, IsNotEmpty,IsOptional } from "class-validator";

export class CreateAddressDto {

   @IsString()
   @IsNotEmpty()
   street!: string

   @IsString()
   @IsNotEmpty()
   number_house!: string

   @IsString()
   @IsOptional()
   complement?: string

   @IsString()
   @IsNotEmpty()
   neighborhood!: string

   @IsString()
   @IsNotEmpty()
   city!: string


   @IsString()
   @IsNotEmpty()
   state!: string

   @IsString()
   @IsNotEmpty()
   zip_code!: string

}