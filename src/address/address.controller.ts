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
import { Address as AddressModel } from '@prisma/client';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('vehicle')
export class VehicleController {

    constructor(private readonly addressService: AddressService) {}

    @Post('signup')
    async signupVehicle (
        @Body() createAddressDto : CreateAddressDto,
    ): Promise<AddressModel> {
           return this.addressService.createAddress(createAddressDto);
    }
   
    @Get(':id')
    async getAddres(@Param('id', ParseIntPipe) id: number): Promise<AddressModel | null>{
     return this.addressService.address({id_address: id})
    }

    @Get()
    async getAddress(): Promise<AddressModel[]> {
      return this.addressService.address({})
    }

  @Patch(':id')
    async updateAddress(
          @Param('id', ParseIntPipe) id: number,
          @Body() UpdateAddressDto: UpdateAddressDto,
        ): Promise <AddressModel>{
            return this.addressService.updateAddress(id, UpdateAddressDto)
        }
    
  @Delete('id')
    async deleteAddress(@Param('id', ParseIntPipe) id: number): Promise<AddressModel>{
        return this.addressService.deleteAddress({id_address: id})
    }
}
