import {
  Inject,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { FipeBrand } from './interfaces/fipe-brand.interface';
import { FipeModel } from './interfaces/fipe-model.interface';
import { FipeYear } from './interfaces/fipe-year.interface';
import { FipePrice } from './interfaces/fipe-price.interface';
import { VehicleType } from './enums/vehicle-type.enum';

@Injectable()
export class FipeService {
  private readonly logger = new Logger(FipeService.name);
  private readonly baseUrl =
    process.env.FIPE_API_BASE_URL ?? 'https://fipe.parallelum.com.br/api/v2';

  constructor(private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getBrands(vehicleType: VehicleType): Promise<FipeBrand[]> {
    return this.request<FipeBrand[]>(`/${vehicleType}/brands`);
  }

  async getModels(
    vehicleType: VehicleType,
    brandId: string,
  ): Promise<FipeModel[]> {
    return this.request<FipeModel[]>(
      `/${vehicleType}/brands/${brandId}/models`,
    );
  }

  async getYears(
    vehicleType: VehicleType,
    brandId: string,
    modelId: string,
  ): Promise<FipeYear[]> {
    return this.request<FipeYear[]>(
      `/${vehicleType}/brands/${brandId}/models/${modelId}/years`,
    );
  }

  async getPrice(
    vehicleType: VehicleType,
    brandId: string,
    modelId: string,
    yearId: string,
  ): Promise<FipePrice> {
    return this.request<FipePrice>(
      `/${vehicleType}/brands/${brandId}/models/${modelId}/years/${yearId}`,
    );
  }

   private async request<T>(path: string): Promise<T> {
    const cached = await this.cacheManager.get<T>(path);
    if (cached) {
      this.logger.log(`Cache HIT: ${path}`);
      return cached;
    }

    this.logger.log(`Cache MISS: ${path} — consultando API externa`);

    try {
      const response = await firstValueFrom(
        this.httpService.get<T>(`${this.baseUrl}${path}`),
      );
      await this.cacheManager.set(path, response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      this.logger.error(
        `Falha ao consultar API da FIPE em ${path}: ${axiosError.message}`,
      );
      throw new ServiceUnavailableException(
        'Não foi possível consultar a tabela FIPE no momento.',
      );
    }
  }
}