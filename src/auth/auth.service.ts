/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import {
  BadRequestException,
  //BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { ErrorHandleService } from 'src/common/exception/exception.controller';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload, ValidRoles } from './interfaces';

@Injectable()
export class AuthService {
  //private readonly logger = new Logger('UserService');
  constructor(
    // ? Patron Repositorio
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({
      email: email,
    });

    //console.log(user);
    if (!user) {
      throw new NotFoundException(`Credential not valids email`);
    }
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(`Credential not valids password`);
    // ? retornar el JWT
    return { user, token: this.getJwtToken({ id: user.id }) };
  }

  //? renovar el token
  async renewToken(user: User) {
    return { user, token: this.getJwtToken({ id: user.id }) };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
