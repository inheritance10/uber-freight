import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { Customer } from "../entities/customer.entity";
import { CustomerService } from "../services/customer.service";
import { RegisterDto } from "../dtos/customer/register.dto";
import { LoginDto } from "../dtos/customer/login.dto";


@Controller("customer")
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService
  ) {
  }

  @Get("/")
  async findAll(): Promise<Customer[]> {
    return await this.customerService.findAll();
  }
}
