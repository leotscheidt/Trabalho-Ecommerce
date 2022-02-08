import { Request, Response } from "express";

import FindProductsByCategoryService from "../../../services/FindProductsByCategoryService";

class ProductsByCategoryController {

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findProductsByCategoryService = new FindProductsByCategoryService();

    const category = await findProductsByCategoryService.execute(Number(id));

    return response.json(category);
  }

}

export default new ProductsByCategoryController();