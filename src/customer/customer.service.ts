import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Customer, Prisma } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({ data });
  }

  async customer(
    customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: customerWhereUniqueInput,
    });
  }

  async customers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }): Promise<Customer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.customer.findMany({ skip, take, cursor, where, orderBy });
  }

  async updateCustomer(
    id: number,
    data: Prisma.CustomerUpdateInput,
  ): Promise<Customer> {
    try {
      return await this.prisma.customer.update({
        where: { id_customer: id },
        data,
      });
    } catch (error) {
      throw new NotFoundException('Cliente não encontrado');
    }
  }

  async deleteCustomer(where: Prisma.CustomerWhereUniqueInput): Promise<Customer> {
    try {
      return await this.prisma.customer.delete({ where });
    } catch (error) {
      throw new NotFoundException('Cliente não encontrado');
    }
  }
}