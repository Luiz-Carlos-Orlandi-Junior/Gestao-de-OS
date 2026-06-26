import { Controller, Body, Post, Get, Patch, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client'; // ← adicione o Prisma aqui
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signupUser(
    @Body() userData: { name: string; email: string; password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel | null> {
    return this.userService.user({ id_user: id });
  }

  @Get()
async getUsers(): Promise<UserModel[]> {
  return this.userService.users({});
}

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: Prisma.UserUpdateInput,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id_user: id },
      data: userData,
    });
  }


  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.deleteUser({ id_user: id });
  }
}

