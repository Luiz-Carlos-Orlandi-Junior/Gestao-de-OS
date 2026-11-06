import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ServiceOrder as ServiceOrderModel } from '@prisma/client';
import { ServiceOrderService } from './service-order.service';
import {UpdateServiceOrderDto} from './dto/UpdateServiceOrder.Dto';
import {CreateServiceOrderDto} from './dto/CreateServiceOrder.Dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('vehicle/:vehicleId/service-orders')
export class ServiceOrderController {
  constructor(private readonly serviceOrder: ServiceOrderService) {}

  @Post()
  async createOrder(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() createServiceOrderDto: CreateServiceOrderDto,
  ): Promise<ServiceOrderModel> {
    return this.serviceOrder.createOrder(vehicleId, createServiceOrderDto);
  }

  @Get()
  async getOrder(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ): Promise<ServiceOrderModel[]> {
    return this.serviceOrder.findOrdersByVehicle(vehicleId);
  }

  @Get(':serviceOrderId')
  async getOrders(
    @Param('serviceOrderId', ParseIntPipe) serviceOrderId: number,
  ): Promise<ServiceOrderModel | null> {
    return this.serviceOrder.findOrder({ id_service_order: serviceOrderId });
  }

  @Patch(':serviceOrderId')
  async updateOrder(
    @Param('serviceOrderId', ParseIntPipe) serviceOrderId: number,
    @Body() UpdateServiceOrderDto: UpdateServiceOrderDto,
  ): Promise<ServiceOrderModel> {
    return this.serviceOrder.updateOrder(serviceOrderId, UpdateServiceOrderDto);
  }

  @Delete(':serviceOrderId')
  async deleteOrder(
    @Param('serviceOrderId', ParseIntPipe) serviceOrderId: number,
  ): Promise<ServiceOrderModel> {
    return this.serviceOrder.deleteOrder({ id_service_order: serviceOrderId });
  }
}