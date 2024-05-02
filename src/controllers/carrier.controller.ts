import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CarrierService } from "../services/carrier.service";
import { RegisterCarrierDto } from "../dtos/carrier/register-carrier.dto";
import { Carrier } from "../entities/carrier.entity";
import { AuthGuard } from "../common/guards/auth.guard";


@Controller("carrier")
export class CarrierController {
  constructor(
    private readonly customerService: CarrierService
  ) {
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async findAll(): Promise<Carrier[]> {
    return await this.customerService.findAll();
  }
}
