/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const user = await lastValueFrom(
      this._clientProxiUser.send(UserMSG.GET_EMAIL, loginUserDto),
    );
    if (!user) {
      throw new NotFoundException(`Credential not valids email`);
    }
    if (!bcrypt.compareSync(loginUserDto.password, user.password))
      throw new UnauthorizedException(`Credential not valids password`);
    // Eliminar el password del objeto user
    const { password, ...userResto } = user;

    // ? retornar el JWT
    //console.log(user);
    return { userResto, token: this.getJwtToken({ id: user._id }) };
  }

  //? renovar el token
  async renewToken(userId: string) {
    const user = await lastValueFrom(
      this._clientProxiUser.send(UserMSG.FIND_ONE, userId),
    );
    return { user, token: this.getJwtToken({ id: userId }) };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async register(createUserDto: CreateUserDto) {
    const user = await lastValueFrom(
      this._clientProxiUser.send(UserMSG.CREATE, createUserDto),
    );
    const { password, ...userResto } = user;
    // ? retornar el JWT
    return { userResto, token: this.getJwtToken({ id: user._id }) };
  }
}
