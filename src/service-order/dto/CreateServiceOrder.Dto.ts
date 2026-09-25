import { IsNotEmpty, IsString, IsOptional,IsNumber } from 'class-validator';


export class CreateServiceOrderDto {

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsOptional()
  price!: Number;

}