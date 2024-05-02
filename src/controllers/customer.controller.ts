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

  @Post("/register")
  async register(@Body() dto: RegisterDto): Promise<Customer> {
    return await this.customerService.register(dto);
  }

  @Post("/login")
  async login(@Body() dto: LoginDto,
              @Res({ passthrough: true }) response: Response
  ): Promise<Customer> {
    return await this.customerService.login(dto, response);
  }
}
