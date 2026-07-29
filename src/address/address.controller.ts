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
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('customer/:customerId/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async createAddress(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<AddressModel> {
    return this.addressService.createAddress(customerId, createAddressDto);
  }

  @Get()
  async getAddresses(
    @Param('customerId', ParseIntPipe) customerId: number,
  ): Promise<AddressModel[]> {
    return this.addressService.addresses(customerId);
  }

  @Get(':addressId')
  async getAddress(
    @Param('addressId', ParseIntPipe) addressId: number,
  ): Promise<AddressModel | null> {
    return this.addressService.address({ id_address: addressId });
  }

  @Patch(':addressId')
  async updateAddress(
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<AddressModel> {
    return this.addressService.updateAddress(addressId, updateAddressDto);
  }

  @Delete(':addressId')
  async deleteAddress(
    @Param('addressId', ParseIntPipe) addressId: number,
  ): Promise<AddressModel> {
    return this.addressService.deleteAddress({ id_address: addressId });
  }
}