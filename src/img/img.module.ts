import { Module } from '@nestjs/common';
import { ImgController } from './img.controller';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ImgController],
  providers: [],
  imports: [CommonModule, ConfigModule, AuthModule],
})
export class ImgModule {}
