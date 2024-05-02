import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CustomerService } from "./customer.service";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "../dtos/customer/register.dto";
import { CarrierService } from "./carrier.service";
import { RegisterCarrierDto } from "../dtos/carrier/register-carrier.dto";


@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private carrierService: CarrierService,
    private jwtService: JwtService
  ) {
  }

  async signInCustomer(email: string, pass: string) {
    const user = await this.customerService.findOne(email);

    const match = await bcrypt.compare(pass, user?.password);

    if (!match) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async signInCarrier(email: string, pass: string) {
    try {
      const user = await this.carrierService.findOne(email);

      if (!user) {
        throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
      }

      const match = await bcrypt.compare(pass, user?.password);

      if (!match) {
        throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
      }
      const payload = { email: user.email, sub: user.id, role: "carrier" };
      return {
        access_token: await this.jwtService.signAsync(payload)
      };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async registerCustomer(dto: RegisterDto) {
    const user = await this.customerService.findOne(dto.email);

    if (!user) {
      dto.password = await bcrypt.hash(dto.password, 10);

      return this.customerService.register(dto);
    } else if (user) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }

  }

  async registerCarrier(dto: RegisterCarrierDto) {
    const user = await this.carrierService.findOne(dto.email);

    if (!user) {
      dto.password = await bcrypt.hash(dto.password, 10);

      return this.carrierService.register(dto);
    } else if (user) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }

  }


}
