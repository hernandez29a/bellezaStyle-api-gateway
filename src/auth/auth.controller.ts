import { Controller, Get, Post, Body } from '@nestjs/common';
import { Auth, GetUser } from './decorators';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get('renewToken')
  @Auth()
  renewToken(@GetUser() user: User) {
    return this.userService.renewToken(user);
  }
}
