import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import {DatabaseModule} from '../database/database.module';
import { CustomerService } from './customer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class CustomerModule {}
