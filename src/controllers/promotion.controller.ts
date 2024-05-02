import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PromotionService } from "../services/promotion.service";
import { Promotion } from "../entities/promotion.entity";
import { PromotionDto } from "../dtos/promotion/dto";
import { AuthGuard } from "../common/guards/auth.guard";


@Controller("promotion")
export class PromotionController {
  constructor(
    private readonly promotionService: PromotionService
  ) {
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async findAll(): Promise<Promotion[]> {
    return await this.promotionService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('/add')
  async create(@Body() dto: PromotionDto): Promise<Promotion> {
    return await this.promotionService.add(dto);
  }

  @Delete('/remove/:id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.promotionService.remove(id);
  }
}
