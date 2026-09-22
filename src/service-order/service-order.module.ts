import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleModule } from 'vehicle/vehicle.module';
import { ServiceOrderService } from './service-order.service';
import {ServiceOrderController} from './service-order.controller'
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ServiceOrderController],
  providers: [ServiceOrderService]
})
export class VehicleModule {}
