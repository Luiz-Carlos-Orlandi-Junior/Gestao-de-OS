import { IsString, IsNotEmpty } from "class-validator";

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  email!: string;
  password!: string;
}