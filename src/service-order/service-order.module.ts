import { Module } from '@nestjs/common';
import { VehicleModule } from 'vehicle/vehicle.module';
import { ServiceOrderService } from './service-order.service';
import {ServiceOrderController} from './service-order.controller'
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [DatabaseModule, VehicleModule],
  controllers: [ServiceOrderController],
  providers: [ServiceOrderService]
})
export class ServiceOrderModule {}
