import { Body, Controller, Delete, Get, HttpException, Param, Post, Query, Request, UseGuards } from "@nestjs/common";
import { FavoriteCarrier } from "../entities/favorite-carrier.entity";
import { FavoriteCarrierDto } from "../dtos/favorite-carrier/dto";
import { AuthGuard } from "../common/guards/auth.guard";
import { FavoriteCarrierService } from "../services/favoroite-carrier.service";
import { HttpExceptionFilter } from "../common/filters/http-exception.filter";


@Controller("favorite-carrier")
export class FavoriteCarrierController {
  constructor(
    private readonly favoroiteCarrierService: FavoriteCarrierService
  ) {
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async findAll(): Promise<FavoriteCarrier[]> {
    return await this.favoroiteCarrierService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/my-favorite-carriers')
  async findOne(@Query() params: any): Promise<any> {
    return await this.favoroiteCarrierService.findByCustomerId(params.id);
  }


  @UseGuards(AuthGuard)
  @Post('/add')
  async create(@Body() dto: FavoriteCarrierDto): Promise<FavoriteCarrier> {
    return await this.favoroiteCarrierService.add(dto);
  }

  @UseGuards(AuthGuard)
  @Delete('/remove')
  async remove(@Body() dto: FavoriteCarrierDto): Promise<void> {
    try {
      if (!dto.customerId || !dto.carrierId) {
        throw new HttpException("Customer id and carrier id are required", 400)
      }else {
        await this.favoroiteCarrierService.remove(dto);
      }
    }catch (e) {
      throw new HttpException(e.message, e.status)
    }

  }


}
