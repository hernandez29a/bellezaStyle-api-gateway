import { Module } from '@nestjs/common';
import { ErrorHandleService } from './exception/exception.controller';
import { ClientProxyBellezaConsultin } from './proxy/client.proxy';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ErrorHandleService, ClientProxyBellezaConsultin, ConfigService],
  exports: [ErrorHandleService, ClientProxyBellezaConsultin],
})
export class CommonModule {}
