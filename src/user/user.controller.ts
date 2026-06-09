import { Controller, Body, Post} from '@nestjs/common';
import { User as UserModel } from 'generated/prisma';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}


  @Post('signup')
  async signupUser(
    @Body() userData: { name: string; email: string, password: string},
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }


}
