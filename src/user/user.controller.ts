import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RolesGuard } from 'src/auth/guards/roles-guard/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { ClientProxyBellezaConsultin } from 'src/common/proxy/client.proxy';
import { Observable } from 'rxjs';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserMSG } from 'src/common/constanstst';

@Controller('user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxyBellezaConsultin) {}
  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  @Post('register')
  //@UseGuards(new RolesGuard())
  register(@Body() createUserDto: CreateUserDto): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.REGISTER, createUserDto);
  }

  @Post()
  //@Auth(ValidRoles.ADMIN_ROLE, ValidRoles.USER_ROLE)
  create(@Body() createUserDto: CreateUserDto): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.CREATE, createUserDto);
  }

  @Get()
  //@Auth(ValidRoles.ADMIN_ROLE)
  findAll(@Query() paginationDto: PaginationDto): Observable<IUser[]> {
    return this._clientProxyUser.send(UserMSG.FIND_ALL, paginationDto);
  }

  @Get(':id')
  //@Auth(ValidRoles.ADMIN_ROLE)
  findOne(@Param('id', ParseMongoIdPipe) id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Patch(':id')
  //@Auth(ValidRoles.ADMIN_ROLE, ValidRoles.USER_ROLE)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.UPDATE, { id, updateUserDto });
  }

  @Delete(':id')
  //@Auth(ValidRoles.ADMIN_ROLE)
  remove(@Param('id', ParseMongoIdPipe) id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.DELETE, id);
  }
}
