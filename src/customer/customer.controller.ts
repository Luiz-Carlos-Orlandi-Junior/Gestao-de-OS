import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Customer as CustomerModel } from '@prisma/client';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('signup')
  async signupCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerModel> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Get(':id')
  async getCustomer(@Param('id', ParseIntPipe) id: number): Promise<CustomerModel | null> {
    return this.customerService.customer({ id_customer: id });
  }

  @Get()
  async getCustomers(): Promise<CustomerModel[]> {
    return this.customerService.customers({});
  }

  @Patch(':id')
  async updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerModel> {
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id', ParseIntPipe) id: number): Promise<CustomerModel> {
    return this.customerService.deleteCustomer({ id_customer: id });
  }
}