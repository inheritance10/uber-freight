import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request, UseGuards
} from "@nestjs/common";

import { Public } from "../common/decorators/public.decorator";
import { AuthService } from "../services/auth.service";
import { RegisterDto } from "../dtos/customer/register.dto";
import { AuthGuard } from "../common/guards/auth.guard";
import { RegisterCarrierDto } from "../dtos/carrier/register-carrier.dto";


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('customer/login')
  signInCustomer(@Body() signInDto: Record<string, any>) {
    return this.authService.signInCustomer(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('carrier/login')
  signInCarrier(@Body() signInDto: Record<string, any>) {
    return this.authService.signInCarrier(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('customer/register')
  registerCustomer(@Body() signInDto: RegisterDto) {
    return this.authService.registerCustomer(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('carrier/register')
  registerCarrier(@Body() signInDto: RegisterCarrierDto) {
    return this.authService.registerCarrier(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
