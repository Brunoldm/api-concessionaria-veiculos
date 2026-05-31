import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/clienteRepository";

export class ClienteService {

    clienteRepository: ClienteRepository = ClienteRepository.getInstance();

    listarTodosClientes(): Cliente[] {
        return this.clienteRepository.listarClientes();
    }

    buscarCliente(id: any): Cliente | undefined {

        const idNumber: number = parseInt(id, 10);

        if (isNaN(idNumber)) {
            throw {
                status: 400,
                message: "ID inválido"
            }
        }

        const cliente = this.clienteRepository.buscarClientePorId(idNumber);

        if (!cliente) {
            throw {
                status: 404,
                message: "Cliente não encontrado"
            }
        }

        return cliente;
    }

    cadastrarNovoCliente(clienteData: Cliente): Cliente {

        const { nome, cpf, telefone, email, cidade } = clienteData;

        if (!nome || !cpf || !telefone) {
            throw {
                status: 400,
                message: "Informações incompletas"
            }
        }

        const cpfExistente = this.clienteRepository
            .listarClientes()
            .find(cliente => cliente.cpf === cpf);

        if (cpfExistente) {
            throw {
                status: 409,
                message: "CPF já cadastrado"
            }
        }

        const novoCliente = new Cliente(
            nome,
            cpf,
            telefone,
            email,
            cidade
        );

        this.clienteRepository.adicionarCliente(novoCliente);

        return novoCliente;
    }

    atualizarCliente(id: any, clienteData: Cliente): Cliente | undefined {

        const idNumber: number = parseInt(id, 10);

        if (isNaN(idNumber)) {
            throw {
                status: 400,
                message: "ID inválido"
            }
        }

        const clienteExistente =
            this.clienteRepository.buscarClientePorId(idNumber);

        if (!clienteExistente) {
            throw {
                status: 404,
                message: "Cliente não encontrado"
            }
        }

        return this.clienteRepository.atualizarClientePorId(
            idNumber,
            clienteData
        );
    }

    deletarCliente(id: any): boolean {

        const idNumber: number = parseInt(id, 10);

        if (isNaN(idNumber)) {
            throw {
                status: 400,
                message: "ID inválido"
            }
        }

        const clienteExistente =
            this.clienteRepository.buscarClientePorId(idNumber);

        if (!clienteExistente) {
            throw {
                status: 404,
                message: "Cliente não encontrado"
            }
        }

        return this.clienteRepository.removerCliente(idNumber);
    }
}