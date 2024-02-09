import { Module } from '@nestjs/common';
import {
  ConfigModule,
  DatabaseModule,
  UserModule,
  AuthModule,
  TaskModule,
} from './modules';
import { ListModule } from './modules/list/list.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    TaskModule,
    ListModule,
  ],
})
export class AppModule {}
