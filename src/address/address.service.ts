import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CustomerService } from '../customer/customer.service';
import { Address, Prisma } from '@prisma/client';
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

   async address(
      addressWhereUniqueInput: Prisma.AddressWhereUniqueInput,
    ): Promise<Address | null> {
      return this.prisma.address.findUnique({
        where: addressWhereUniqueInput,
      });
    }
  
    async customers(params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.AddressWhereUniqueInput;
      where?: Prisma.AddressWhereInput;
      orderBy?: Prisma.AddressOrderByWithRelationInput;
    }): Promise<Address[]> {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.address.findMany({ skip, take, cursor, where, orderBy });
    }
  
    async updateAddress(
      id: number,
      data: Prisma.AddressUpdateInput,
    ): Promise<Address> {
      try {
        return await this.prisma.address.update({
          where: { id_address: id },
          data,
        });
      } catch (error) {
        throw new NotFoundException('endereço não encontrado');
      }
    }
  
    async deleteAddress(where: Prisma.AddressWhereUniqueInput): Promise<Address> {
      try {
        return await this.prisma.address.delete({ where });
      } catch (error) {
        throw new NotFoundException('Endereço não encontrado');
      }
    }
}