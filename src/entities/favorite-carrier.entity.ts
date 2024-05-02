import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";

import { Carrier } from './carrier.entity';
import { Customer } from "./customer.entity";

@Entity()
export class FavoriteCarrier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @Column()
  carrierId: number;

  @ManyToOne(() => Customer, user => user.favoriteCarriers)
  customer: Customer;

  @ManyToOne(() => Carrier, carrier => carrier.favoriteCustomer)
  carrier: Carrier;
}
