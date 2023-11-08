/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import {
  BadRequestException,
  //BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorHandleService } from 'src/common/exception/exception.controller';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload, ValidRoles } from './interfaces';
import { ClientProxyBellezaConsultin } from 'src/common/proxy/client.proxy';
import { lastValueFrom } from 'rxjs';
import { UserMSG } from 'src/common/constanstst';
import { IUser } from 'src/common/interfaces/user.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  //private readonly logger = new Logger('UserService');
  constructor(
    // ? Patron Repositorio
    private readonly clientProxy: ClientProxyBellezaConsultin,
    private readonly jwtService: JwtService,
  ) {}

  private _clientProxiUser = this.clientProxy.clientProxyUsers();

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const data = {
      email,
      password,
    };
    const user: IUser = await lastValueFrom(
      this._clientProxiUser.send(UserMSG.GET_EMAIL, data),
    );
    //console.log(user);
    /*const user = await this.userModel.findOne({
      email: email,
    });*/

    //console.log(user);
    // ? retornar el JWT
    return { user, token: this.getJwtToken({ id: user.id }) };
  }

  //? renovar el token
  async renewToken(user: IUser) {
    return { user, token: this.getJwtToken({ id: user.id }) };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async register(createUserDto: CreateUserDto) {
    const user: IUser = await lastValueFrom(
      this._clientProxiUser.send(UserMSG.CREATE, createUserDto),
    );

    // ? retornar el JWT
    return { user, token: this.getJwtToken({ id: user.id }) };
  }
}
