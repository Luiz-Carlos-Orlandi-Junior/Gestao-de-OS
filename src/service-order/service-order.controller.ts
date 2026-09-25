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
import { Address as AddressModel } from '@prisma/client';
import { ServiceOrderService } from './service-order.service';
import { CreateServiceOrderDto } from './dto/CreateServiceOrder.Dto';
import { UpdateServiceOrderDto } from './dto/UpdateServiceOrder.Dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('customer/:customerId/addresses')
export class ServiceOrderController {
  constructor(private readonly serviceOrder: ServiceOrderService) {}

  @Post()
  async createOrder(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() createServiceOrderDto: CreateServiceOrderDto,
  ): Promise<AddressModel> {
    return this.serviceOrder.createOrder(customerId, createServiceOrderDto);
  }

  @Get()
  async getOrder(
    @Param('customerId', ParseIntPipe) customerId: number,
  ): Promise<AddressModel[]> {
    return this.serviceOrder.addresses(customerId);
  }

  @Get(':addressId')
  async getAddress(
    @Param('addressId', ParseIntPipe) addressId: number,
  ): Promise<AddressModel | null> {
    return this.serviceOrder.address({ id_address: addressId });
  }

  @Patch(':addressId')
  async updateAddress(
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<AddressModel> {
    return this.serviceOrder.updateAddress(addressId, updateAddressDto);
  }

  @Delete(':addressId')
  async deleteAddress(
    @Param('addressId', ParseIntPipe) addressId: number,
  ): Promise<AddressModel> {
    return this.serviceOrder.deleteAddress({ id_address: addressId });
  }
}