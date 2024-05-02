import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FavoriteCarrier } from './favorite-carrier.entity';

@Entity()
export class Customer {
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

  @OneToMany(() => FavoriteCarrier, favoriteCarrier => favoriteCarrier.customer)
  favoriteCarriers: FavoriteCarrier[];
}
