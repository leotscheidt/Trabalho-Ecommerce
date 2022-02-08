import AppError from "../../../shared/errors/AppErrors";
import Category from "../infra/typeorm/entities/Category";
import ProductsByCategoryRepository from "../infra/typeorm/repositories/ProductsByCategoryRepository";

export default class FindProductsByCategoryService {
  public async execute(id: number): Promise<Category> {
    const categoryRepository = new ProductsByCategoryRepository();

    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new AppError("Categoria não existe");
    }

    return category;
  }
}
