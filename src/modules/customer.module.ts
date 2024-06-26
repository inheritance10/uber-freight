import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerService } from "../services/customer.service";
import { Customer } from "../entities/customer.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class CustomerModule {}
