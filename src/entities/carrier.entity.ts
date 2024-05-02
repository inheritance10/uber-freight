import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Promotion } from './promotion.entity';
import { FavoriteCarrier } from './favorite-carrier.entity';

@Entity()
export class Carrier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column( {unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  km_price: number;

  @OneToMany(() => Promotion, promotion => promotion.carrier)
  promotions: Promotion[];

  @OneToMany(() => FavoriteCarrier, favoriteCarrier => favoriteCarrier.carrier)
  favoriteCustomer: FavoriteCarrier[];
}
