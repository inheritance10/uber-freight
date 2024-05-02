import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { FavoriteCarrier } from "../entities/favorite-carrier.entity";
import { FavoriteCarrierController } from "../controllers/favorite-carrier.controller";
import { FavoriteCarrierService } from "../services/favoroite-carrier.service";


@Module({
  imports: [TypeOrmModule.forFeature([FavoriteCarrier])],
  controllers: [FavoriteCarrierController],
  providers: [FavoriteCarrierService],
})
export class FavoriteCarrierModule {}
