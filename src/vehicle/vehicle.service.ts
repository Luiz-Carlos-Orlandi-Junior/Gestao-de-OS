import { Injectable, NotFoundException } from '@nestjs/common';
import {Vehicle, Prisma} from '@prisma/client'
import { PrismaService} from '../database/prisma.service'
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async createVehicle(data: CreateVehicleDto): Promise<Vehicle> {
    const {customerId, ...vehicleData} = data
    return this.prisma.vehicle.create({
      data: {
        ...vehicleData,
        customer: {
          connect: {id_customer: customerId}
        }
      }
    })
  }
  
  async vehicle (
    VehicleWhereUniqueInput:  Prisma.VehicleWhereUniqueInput,
  ): Promise <Vehicle | null> {
    return this.prisma.vehicle.findUnique({
      where: VehicleWhereUniqueInput
    })
  }
}

