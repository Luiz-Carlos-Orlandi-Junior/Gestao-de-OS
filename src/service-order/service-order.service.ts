import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { ServiceOrder, Prisma } from '@prisma/client';
import { CreateServiceOrderDto } from './dto/CreateServiceOrder.Dto';
import { UpdateServiceOrderDto } from './dto/UpdateServiceOrder.Dto';

@Injectable()
export class ServiceOrderService {
  constructor(
    private prisma: PrismaService,
    private vehicleService: VehicleService,
  ) {}

  async createOrder(
    vehicleId: number,
    data: CreateServiceOrderDto,
  ): Promise<ServiceOrder> {
    const vehicle = await this.vehicleService.vehicle({
      id_vehicle: vehicleId,
    });

    if (!vehicle) {
      throw new NotFoundException(
        `Veiculo com id ${vehicleId} não encontrado`,
      );
    }

    return this.prisma.serviceOrder.create({
      data: {
        ...data,
        vehicle: {
          connect: { id_vehicle: vehicleId },
        },
      },
    });
  }

  async OrderService(
    ServiceOrderWhereUniqueInput: Prisma.ServiceOrderWhereUniqueInput,
  ): Promise<ServiceOrder | null> {
    return this.prisma.serviceOrder.findUnique({
      where:ServiceOrderWhereUniqueInput,
    });
  }

  async OrderServices(vehicleId: number): Promise<ServiceOrder[]> {
    return this.prisma.serviceOrder.findMany({
      where: {  vehicle_id : vehicleId },
    });
  }

  async updateOrderService(
    id: number,
    data: UpdateServiceOrderDto,
  ): Promise<ServiceOrder> {
    try {
      return await this.prisma.serviceOrder.update({
        where: { id_service_order: id },
        data,
      });
    } catch (error) {
      throw new NotFoundException('Ordem de serviço não encontrada');
    }
  }

  async deleteOrderService(
    where: Prisma.ServiceOrderWhereUniqueInput,
  ): Promise<ServiceOrder> {
    try {
      return await this.prisma.serviceOrder.delete({ where });
    } catch (error) {
      throw new NotFoundException('Ordem de serviço não encontrada');
    }
  }
}