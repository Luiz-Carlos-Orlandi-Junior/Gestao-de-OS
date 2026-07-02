import { 
    Controller,
    Body,
    Get,
    Post,
    Delete,
    Patch,
    Param,
    ParseIntPipe,
 } from '@nestjs/common';
import { Vehicle as VehicleModel } from '@prisma/client';
import { VehicleService } from './vehicle.service';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Controller('vehicle')
export class VehicleController {

    constructor(private readonly vehicleService: VehicleService) {}

    @Post('signup')
    async signupVehicle (
        @Body() createVehicleDto : CreateVehicleDto,
    ): Promise<VehicleModel> {
           return this.vehicleService.createVehicle(createVehicleDto);
    }
   
    @Get(':id')
    async getVehicle(@Param('id', ParseIntPipe) id: number): Promise<VehicleModel | null>{
     return this.vehicleService.vehicle({id_vehicle: id})
    }

    @Get()
    async getVehicles(): Promise<VehicleModel[]> {
      return this.vehicleService.vehicles({})
    }

  @Patch(':id')
    async updateVehicle(
          @Param('id', ParseIntPipe) id: number,
          @Body() UpdateVehicleDto: UpdateVehicleDto,
        ): Promise <VehicleModel>{
            return this.vehicleService.updateVehicle(id, UpdateVehicleDto)
        }
    
  @Delete('id')
    async deleteVehicle(@Param('id', ParseIntPipe) id: number): Promise<VehicleModel>{
        return this.vehicleService.deleteVechicle({id_vehicle: id})
    }
}
