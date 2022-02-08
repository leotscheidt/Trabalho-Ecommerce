import IOrdersByClientRepository from "modules/clients/repositories/IOrdersByClientRepository";
import { getRepository, Repository } from "typeorm";
import Client from "../entities/Client";


export default class OrdersByClientRepository implements IOrdersByClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  async findById(id: number): Promise<Client | undefined> {
   
    return (
      this.ormRepository
        .createQueryBuilder("c")
        // .select(["c.id", "c.descricao", "prod.nome"])
        .leftJoinAndSelect("c.pedidos", "prod")
        .where("c.id = :id", { id })
        .getOne()
    );
  }
}
