import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interfaces/jwt-interface.payload';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { ClientProxyBellezaConsultin } from 'src/common/proxy/client.proxy';
import { UserMSG } from 'src/common/constanstst';
import { lastValueFrom } from 'rxjs';
import { IUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // ? Patron Repositorio
    private readonly clientProxy: ClientProxyBellezaConsultin,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  private _clientProxiUser = this.clientProxy.clientProxyUsers();

  async validate(payload: JwtPayload): Promise<IUser> {
    const { id } = payload;

    // * eliminar esto y hacerlo por el send
    // *const user = await this.userModel.findById({ _id: id });

    const user = await lastValueFrom(
      this._clientProxiUser.send(UserMSG.FIND_ONE, id),
    );
    if (!user) throw new UnauthorizedException(`Token not valid`);
    //console.log({ user });

    if (!user.status) {
      throw new UnauthorizedException('User is inactive, talk with an Admin');
    }

    return user;
  }
}
