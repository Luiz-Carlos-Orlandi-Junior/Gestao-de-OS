import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import {DatabaseModule} from '../database/database.module';
import { AddressService } from './address.service';
import { CustomerModule } from 'customer/customer.module';

@Module({
  imports: [DatabaseModule, CustomerModule],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
