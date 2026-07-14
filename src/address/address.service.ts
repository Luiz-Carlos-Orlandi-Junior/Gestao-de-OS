import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CustomerService } from '../customer/customer.service';
import { Address } from '@prisma/client';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(
    private prisma: PrismaService,
    private customerService: CustomerService,
  ) {}

  async createAddress(
    customerId: number,
    data: CreateAddressDto,
  ): Promise<Address> {
    const customer = await this.customerService.customer({
      id_customer: customerId,
    });

    if (!customer) {
      throw new NotFoundException(
        `Cliente com id ${customerId} não encontrado`,
      );
    }

    return this.prisma.address.create({
      data: {
        ...data,
        customer: {
          connect: { id_customer: customerId },
        },
      },
    });
  }

  
}