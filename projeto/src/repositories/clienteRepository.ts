import { Cliente } from "../models/Cliente";
import mysqlConnection from "../database/mysql";
import { executarComandoSQL } from "../database/mysql";

export class ClienteRepository {
    private static instance: ClienteRepository;

    private constructor() {}

    public static getInstance(): ClienteRepository {
        if (!this.instance) {
            this.instance = new ClienteRepository();
        }

        return this.instance;
    }

    listarClientes(): Cliente[] {
        return this.clienteList;
    }

    buscarClientePorId(id: number): Cliente | undefined {
        return this.clienteList.find(
            cliente => cliente.id_cliente === id
        );
    }

    adicionarCliente(cliente: Cliente): void {
        this.clienteList.push(cliente);
    }

    atualizarClientePorId(id: number, clienteData: Cliente): Cliente | undefined {

        const cliente = this.clienteList.find(
            cliente => cliente.id_cliente === id
        );

        if (cliente) {
            cliente.nome = clienteData.nome;
            cliente.cpf = clienteData.cpf;
            cliente.telefone = clienteData.telefone;
            cliente.email = clienteData.email;
            cliente.cidade = clienteData.cidade;
        }

        return cliente;
    }

    removerCliente(id: number): boolean {

        const indice = this.clienteList.findIndex(
            cliente => cliente.id_cliente === id
        );

        if (indice !== -1) {
            this.clienteList.splice(indice, 1);
            return true;
        }

        return false;
    }
}