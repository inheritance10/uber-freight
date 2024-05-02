import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterCarrierDto } from "../dtos/carrier/register-carrier.dto";
import { Carrier } from "../entities/carrier.entity";


@Injectable()
export class CarrierService {


  constructor(
    @InjectRepository(Carrier)
    private readonly carrierRepository: Repository<Carrier>
  ) {}

  async findAll(): Promise<Carrier[]> {
    return await this.carrierRepository.find();
  }

  async findOne(email: string): Promise<Carrier> {
    return await this.carrierRepository.findOne({ where: { email: email } });
  }

  async register(dto: RegisterCarrierDto): Promise<Carrier> {
    return await this.carrierRepository.save(dto);
  }

  async remove(id: number): Promise<void> {
    await this.findOneById(id).then((carrier) => {
      this.carrierRepository.remove(carrier);
    });
  }

  async findOneById(id: number): Promise<Carrier> {
    return await this.carrierRepository.findOne({
      where: { id: id }
    });
  }



}
