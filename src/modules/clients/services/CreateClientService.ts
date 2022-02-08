import AppError from "../../../shared/errors/AppErrors";
import IClientDTO from "../dtos/IClientDTO";
import Client from "../infra/typeorm/entities/Client";
import ClientRepository from "../infra/typeorm/repositories/ClientRepository";
import FindAllClientsService from "./FindAllClientsService";


export default class CreateClientService {
  public async execute(data: IClientDTO): Promise<Client> {
    const clientRepository = new ClientRepository();
    const listClientsService = new FindAllClientsService();
    const listClients = await listClientsService.execute();
    const client = await clientRepository.create(data);

    const cpflist = listClients.map(function (Getcpf){
      return Getcpf.cpf;
    });

    for (var i=0; i<cpflist.length - 1; i++){
      if (cpflist){
        if (cpflist[i] === client.cpf){
          throw new AppError("CPF já cadastrado.");
        }
      }
    }

    return client;
  }
}
