import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CustomerService } from '../customer/customer.service';
import { Address, Prisma } from '@prisma/client';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

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

  async address(
    addressWhereUniqueInput: Prisma.AddressWhereUniqueInput,
  ): Promise<Address | null> {
    return this.prisma.address.findUnique({
      where: addressWhereUniqueInput,
    });
  }

  async addresses(customerId: number): Promise<Address[]> {
    return this.prisma.address.findMany({
      where: { customer_id: customerId },
    });
  }

  async updateAddress(
    id: number,
    data: UpdateAddressDto,
  ): Promise<Address> {
    try {
      return await this.prisma.address.update({
        where: { id_address: id },
        data,
      });
    } catch (error) {
      throw new NotFoundException('Endereço não encontrado');
    }
  }

  async deleteAddress(
    where: Prisma.AddressWhereUniqueInput,
  ): Promise<Address> {
    try {
      return await this.prisma.address.delete({ where });
    } catch (error) {
      throw new NotFoundException('Endereço não encontrado');
    }
  }
}