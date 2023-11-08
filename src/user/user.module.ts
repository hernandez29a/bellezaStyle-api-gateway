import { Module } from '@nestjs/common';
//import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [],
  imports: [CommonModule, ConfigModule, AuthModule],
})
export class UserModule {}
