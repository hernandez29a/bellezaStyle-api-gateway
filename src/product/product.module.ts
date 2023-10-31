import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductController],
  providers: [],
  imports: [CommonModule, ConfigModule, AuthModule],
})
export class ProductModule {}
