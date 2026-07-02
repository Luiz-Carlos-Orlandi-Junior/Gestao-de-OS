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

async vehicles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VehicleWhereUniqueInput;
    where?: Prisma.VehicleWhereInput;
    orderBy?: Prisma.VehicleOrderByWithRelationInput;
  }): Promise<Vehicle[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.vehicle.findMany({ skip, take, cursor, where, orderBy });
  }

  async updateVehicle(
    id: number,
    data: Prisma.VehicleUpdateInput
  ): Promise<Vehicle> {
    try{
      return await this.prisma.vehicle.update({
            where: {id_vehicle: id},
            data
      })
    } catch (error){
       throw new NotFoundException('Veiculo não encontrado');
    }
  }

  async deleteVechicle(where: Prisma.VehicleWhereUniqueInput): Promise<Vehicle>{
    try {
      return this.prisma.vehicle.delete({where})
    } catch (error) {
      throw new NotFoundException('Veiculo não encontrado')
    }
  }

}

