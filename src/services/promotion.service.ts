import { HttpException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Promotion } from "../entities/promotion.entity";
import { PromotionDto } from "../dtos/promotion/dto";

@Injectable()
export class PromotionService {


  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>
  ) {
  }

  async findAll(): Promise<Promotion[]> {
    return await this.promotionRepository.find();
  }

  async add(dto: PromotionDto): Promise<Promotion> {
    try {
      dto.code = Math.random().toString(36).substring(7);
      return await this.promotionRepository.save(dto);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const promotion = await this.promotionRepository.findOne({
        where: {
          id
        }
      });
      if (!promotion) {
        throw new HttpException("Promotion not found", 404);
      } else {
        await this.promotionRepository.delete(promotion);
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

}
