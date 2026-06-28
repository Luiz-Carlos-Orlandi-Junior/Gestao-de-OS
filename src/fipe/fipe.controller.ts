import { Controller, Get, Param, ParseEnumPipe } from '@nestjs/common';
import { FipeService } from './fipe.service';
import { VehicleType } from './enums/vehicle-type.enum';
import { FipeBrand } from './interfaces/fipe-brand.interface';
import { FipeModel } from './interfaces/fipe-model.interface';
import { FipeYear } from './interfaces/fipe-year.interface';
import { FipePrice } from './interfaces/fipe-price.interface';

@Controller('fipe')
export class FipeController {
  constructor(private readonly fipeService: FipeService) {}

  @Get(':vehicleType/brands')
  async getBrands(
    @Param('vehicleType', new ParseEnumPipe(VehicleType))
    vehicleType: VehicleType,
  ): Promise<FipeBrand[]> {
    return this.fipeService.getBrands(vehicleType);
  }

  @Get(':vehicleType/brands/:brandId/models')
  async getModels(
    @Param('vehicleType', new ParseEnumPipe(VehicleType))
    vehicleType: VehicleType,
    @Param('brandId') brandId: string,
  ): Promise<FipeModel[]> {
    return this.fipeService.getModels(vehicleType, brandId);
  }

  @Get(':vehicleType/brands/:brandId/models/:modelId/years')
  async getYears(
    @Param('vehicleType', new ParseEnumPipe(VehicleType))
    vehicleType: VehicleType,
    @Param('brandId') brandId: string,
    @Param('modelId') modelId: string,
  ): Promise<FipeYear[]> {
    return this.fipeService.getYears(vehicleType, brandId, modelId);
  }

  @Get(':vehicleType/brands/:brandId/models/:modelId/years/:yearId')
  async getPrice(
    @Param('vehicleType', new ParseEnumPipe(VehicleType))
    vehicleType: VehicleType,
    @Param('brandId') brandId: string,
    @Param('modelId') modelId: string,
    @Param('yearId') yearId: string,
  ): Promise<FipePrice> {
    return this.fipeService.getPrice(vehicleType, brandId, modelId, yearId);
  }
}