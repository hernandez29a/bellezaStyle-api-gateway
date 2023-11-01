import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CategoryController],
  providers: [],
  imports: [CommonModule, ConfigModule, AuthModule],
})
export class CategoryModule {}
