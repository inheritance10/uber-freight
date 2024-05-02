import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { CarrierController } from "../controllers/carrier.controller";
import { CarrierService } from "../services/carrier.service";
import { Carrier } from "../entities/carrier.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Carrier])],
  controllers: [CarrierController],
  providers: [CarrierService],
  exports: [CarrierService]
})
export class CarrierModule {}
