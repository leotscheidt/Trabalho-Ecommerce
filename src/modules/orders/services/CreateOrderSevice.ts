import Product from "../../products/infra/typeorm/entities/Product";
import FindProductByIdService from "../../products/services/FindProductByIdService";
import UpdateProductService from "../../products/services/UpdateProductService";
import AppError from "../../../shared/errors/AppErrors";
import IOrderDTO from "../dtos/IOrderDTO";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";

export default class CreateOrderService {
  public async execute(data: IOrderDTO): Promise<Order> {
    const orderRepository = new OrderRepository();
    const FindProduct = new FindProductByIdService;
    const UpdateProduct = new UpdateProductService;
    const itemList: Array<Product> = [];
    let amount = 0;

    if (data.pedido_produtos.length === 0) {
      throw new AppError("Não há produtos no pedido");
    }

    for (let i = 0; i < data.pedido_produtos.length; i++) {

      itemList[i] = await FindProduct.execute(data.pedido_produtos[i].produto_id);

      if (data.pedido_produtos[i].quantidade <= 0) {
        throw new AppError("Quantidade inválida");
      }

      if (data.pedido_produtos[i].quantidade <= itemList[i].quantidade) {
        itemList[i].quantidade -= data.pedido_produtos[i].quantidade;
        await UpdateProduct.execute(itemList[i]);
      } else {
        throw new AppError("Quantidade insuficiente em estoque");
      }

      amount += itemList[i].preco * data.pedido_produtos[i].quantidade;

    }
    data.valor = amount - data.desconto;

    const order = await orderRepository.create(data);

    return order;
  }
}
