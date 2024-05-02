import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Customer } from "../entities/customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "../dtos/customer/register.dto";
import { LoginDto } from "../dtos/customer/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CustomerService {


  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly jwtService: JwtService
  ) {
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(email: string): Promise<Customer> {
    return await this.customerRepository.findOne({ where: { email: email } });
  }


  async register(dto: RegisterDto): Promise<Customer> {
    try {

      return await this.customerRepository.save(dto);

    } catch (error) {
      throw error;
    }

  }

  async login(dto: LoginDto, response): Promise<any> {
    try {
      const customer = await this.customerRepository.findOne({ where: { email: dto.email } });
      if (!customer) {
        throw new HttpException("Not Found User", HttpStatus.NOT_FOUND);
      }
      const match = await bcrypt.compare(dto.password, customer.password);
      if (!match) {
        throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
      }
      const jwt = await this.jwtService.signAsync({ id: customer.id });
      response.cookie("jwt", jwt, { httpOnly: true });

      return jwt;
    } catch (error) {
      throw error;
    }
  }

}
