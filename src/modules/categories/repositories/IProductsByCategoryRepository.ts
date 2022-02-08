import Category from "../infra/typeorm/entities/Category";

export default interface IProductsByCategoryRepository {

    findById(id: number): Promise<Category | undefined>;

}