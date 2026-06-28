import { Module } from '@nestjs/common';
import { AuthModule } from 'auth/auth.module';
import { UserModule } from 'user/user.module';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './customer/customer.module';
import { FipeModule } from './fipe/fipe.module';


@Module({
  imports: [AuthModule, UserModule, DatabaseModule, CustomerModule,FipeModule],
})
export class AppModule {}
