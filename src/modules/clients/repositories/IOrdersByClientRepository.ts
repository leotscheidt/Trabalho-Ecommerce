import Client from "../infra/typeorm/entities/Client";


export default interface IOrdersByClientRepository {

  findById(id: number): Promise<Client | undefined>;

}
