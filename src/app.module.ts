import { Module } from '@nestjs/common';
import {
  ConfigModule,
  DatabaseModule,
  UserModule,
  AuthModule,
} from './modules';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, AuthModule],
})
export class AppModule {}
