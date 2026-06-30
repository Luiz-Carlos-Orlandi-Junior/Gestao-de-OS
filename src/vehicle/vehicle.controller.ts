import { 
    Controller,
    Body,
    Get,
    Post,
    Delete,
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
   
    

    
}
