import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { Address, Prisma } from '@prisma/client';
import { CreateServiceOrderDto } from './dto/CreateServiceOrder.Dto';
import { UpdateServiceOrderDto } from './dto/UpdateServiceOrder.Dto';

@Injectable()
export class ServiceOrderService {
  constructor(
    private prisma: PrismaService,
    private vehicleService: VehicleService,
  ) {}

  async createAddress(
    customerId: number,
    data: CreateServiceOrderDto,
  ): Promise<Address> {
    const customer = await this.vehicleService.customer({
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
    data: UpdateServiceOrderDto,
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