import { Request, Response } from "express";

import FindOrdersByClientService from "../../../services/FindOrdersByClientService";

class OrdersByClientController {

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrdersByClientService = new FindOrdersByClientService();

    const client = await findOrdersByClientService.execute(Number(id));

    return response.json(client);
  }

}

export default new OrdersByClientController();