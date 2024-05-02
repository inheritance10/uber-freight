import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Carrier } from './carrier.entity';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  discount_amount: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  carrierId: number;

  @ManyToOne(() => Carrier, carrier => carrier.promotions)
  carrier: Carrier;
}
