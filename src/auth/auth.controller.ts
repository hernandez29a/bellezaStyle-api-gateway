import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { Auth, GetUser } from './decorators';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { IUser } from 'src/common/interfaces/user.interface';
import { RolesGuard } from './guards/roles-guard/roles.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Observable } from 'rxjs';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('renewToken')
  @Auth(ValidRoles.ADMIN_ROLE, ValidRoles.ESPEC_ROLE, ValidRoles.USER_ROLE)
  renewToken(@GetUser() user: IUser) {
    //return `del usuario es ${user._id}`;
    return this.authService.renewToken(user._id);
  }

  @Post('register')
  @UseGuards(new RolesGuard())
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
