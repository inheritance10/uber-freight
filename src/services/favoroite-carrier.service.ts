import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FavoriteCarrier } from "../entities/favorite-carrier.entity";
import { FavoriteCarrierDto } from "../dtos/favorite-carrier/dto";

@Injectable()
export class FavoriteCarrierService {
  constructor(
      @InjectRepository(FavoriteCarrier)
    private readonly favoriteCarrierRepository: Repository<FavoriteCarrier>
  ) {
  }

  async findAll(): Promise<FavoriteCarrier[]> {
    return await this.favoriteCarrierRepository.find();
  }

  async findByCustomerId(customerId: number): Promise<FavoriteCarrier[]> {
    return await this.favoriteCarrierRepository.find({
      where: {
        customerId
      },
      relations: ['carrier']
    });
  }

  async add(dto: FavoriteCarrierDto): Promise<FavoriteCarrier> {

    try {
      return await this.favoriteCarrierRepository.save(dto);
    } catch (error) {
      console.log(error);

      if (error.code === 'ER_NO_REFERENCED_ROW_2') {

        throw new HttpException(error.sqlMessage, 400);
      }
      throw error;
    }
  }

  async remove(dto: FavoriteCarrierDto): Promise<void> {
    const { customerId, carrierId } = dto;

    const favoriteCarrier = await this.favoriteCarrierRepository.findOne({
      where: {
        customerId,
        carrierId
      }
    });

    if (!favoriteCarrier) {
      throw new HttpException("Favorite carrier not found", 404)
    } else {
      await this.favoriteCarrierRepository.delete(favoriteCarrier);
    }
  }

}
