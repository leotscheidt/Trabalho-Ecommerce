import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import Category from "../../../../categories/infra/typeorm/entities/Category";

import OrderProduct from "../../../../../modules/orders/infra/typeorm/entities/OrderProduct";

@Entity("produtos")
export default class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  nome: string;

  @Column()
  preco: number;

  @Column()
  quantidade: number;

  @Column()
  categoria_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  
  @ManyToOne(() => Category, (category) => category.produtos)
  @JoinColumn({ name: "categoria_id" })

  @OneToMany(() => OrderProduct, (order_product) => order_product.produto)
  pedido_produtos: OrderProduct[];

  categoria: Category;
}
