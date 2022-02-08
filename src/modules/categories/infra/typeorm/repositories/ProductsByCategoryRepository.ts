import IProductsByCategoryRepository from "../../../repositories/IProductsByCategoryRepository";
import { getRepository, Repository } from "typeorm";
import Category from "../entities/Category";

export default class ProductsByCategoryRepository implements IProductsByCategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }


  async findById(id: number): Promise<Category | undefined> {
    
    return (
      this.ormRepository
        .createQueryBuilder("c")
        // .select(["c.id", "c.descricao", "prod.nome"])
        .leftJoinAndSelect("c.produtos", "prod")
        .where("c.id = :id", { id })
        .getOne()
    );
  }
}
