import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FipeController } from './fipe.controller';
import { FipeService } from './fipe.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
    HttpModule,
    CacheModule.register({
      ttl: 60 * 60 * 1000, 
    }),
  ],
  controllers: [FipeController],
  providers: [FipeService],
})
export class FipeModule {}