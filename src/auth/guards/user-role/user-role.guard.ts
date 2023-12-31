import { Reflector } from '@nestjs/core';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { IUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    if (!validRoles) return true;
    if (validRoles.length === 0) return true;
    const req = context.switchToHttp().getRequest();
    const user = req.user as IUser;
    // * validar despues que se haga una update console.log(user);
    //console.log(user, 'Usuario logeado valido');
    //console.log(req, 'el usuario es: ' + user);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (validRoles.includes(user.rol)) {
      return true;
    }
    //console.log({ userRoles: user.rol });
    //console.log('UserRoleGuard');
    //console.log({ validRoles });
    //return true;
    throw new ForbiddenException(
      `User ${user.displayName} need a valid role: [${validRoles}]`,
    );
  }
}
