import IProductDTO from "../../../../products/dtos/IProductDTO";
import IProductRepository from "../../../../products/repositories/IProductRepository";
import { DeleteResult, getRepository, Repository } from "typeorm";
import Product from "../entities/Product";


export default class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.ormRepository.delete(id);
  }

  async update(data: IProductDTO): Promise<Product> {
    const product = await this.ormRepository.save(data);
    return product;
  }

  async findById(id: number): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  async list(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  async create(data: IProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);
    return this.ormRepository.save(product);
  }
}
