import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/clienteRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";

export class ClienteService {

    clienteRepository: ClienteRepository = ClienteRepository.getInstance();

    notaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance();

    async listarTodosClientes(): Promise<Cliente[]> {
        return this.clienteRepository.listarClientes();
    }

    async buscarCliente(id: any): Promise<Cliente> {

        const idNumber: number = parseInt(id, 10);

        if (isNaN(idNumber)) {
            throw {
                status: 400,
                message: "ID inválido"
            }
        }

        const cliente = await this.clienteRepository.buscarClientePorId(idNumber);

        if (!cliente) {
            throw {
                status: 404,
                message: "Cliente não encontrado"
            }
        }

        return cliente;
    }

    async cadastrarNovoCliente(clienteData: Cliente): Promise<Cliente> {

        const { nome, cpf, telefone, email, cidade } = clienteData;

        if (!nome || !cpf || !telefone) {
            throw {
                status: 400,
                message: "Informações incompletas"
            }
        }

        const clientes = await this.clienteRepository.listarClientes();

        const cpfExistente = clientes.find(cliente => cliente.cpf === cpf);

        if (cpfExistente) {
            throw {
                status: 409,
                message: "CPF já cadastrado"
            }
        }

        const novoCliente = new Cliente(
            null,
            nome,
            cpf,
            telefone,
            email,
            cidade
        );

        await this.clienteRepository.adicionarCliente(novoCliente);

        return novoCliente;
    }

    async atualizarCliente(id: any, clienteData: Cliente): Promise<Cliente> {

        const idNumber: number = parseInt(id, 10);

        if (isNaN(idNumber)) {
            throw {
                status: 400,
                message: "ID inválido"
            }
        }

        const clienteExistente =
            await this.clienteRepository.buscarClientePorId(idNumber);

        if (!clienteExistente) {
            throw {
                status: 404,
                message: "Cliente não encontrado"
            }
        }

        return await this.clienteRepository.atualizarClientePorId(
            idNumber,
            clienteData
        );
    }

    async deletarCliente(id: any): Promise<Cliente> {

        const idNumber: number = parseInt(id, 10);

        if (isNaN(idNumber)) {
            throw {
                status: 400,
                message: "ID inválido"
            }
        }

        const clienteExistente =
            await this.clienteRepository.buscarClientePorId(idNumber);

        if (!clienteExistente) {
            throw {
                status: 404,
                message: "Cliente não encontrado"
            }
        }

        const notas = await this.notaFiscalRepository.listarNotasFiscaisDeUmCliente(idNumber);

    if (notas.length > 0) {
        throw {
            status: 422,
            message: "Cliente possui notas fiscais cadastradas"
        }
    }

        return await this.clienteRepository.removerCliente(clienteExistente);
    }

    async listarNotasFiscaisDeUmCliente(id_cli: any) {
        const idNumber: number = parseInt(id_cli, 10);

        if (isNaN(idNumber)) {
            throw {
                status: 400,
                message: "ID inválido"
            };
        }

        const clienteExistente = await this.clienteRepository.buscarClientePorId(idNumber);

        if (!clienteExistente) {
            throw {
                status: 404,
                message: "Cliente não encontrado"
            };
        }

        const todasNotas = await this.notaFiscalRepository.listarTodasNotasFiscais();
        const notasDoCliente = todasNotas.filter(nota => nota.id_cliente === idNumber);

        return notasDoCliente;
    }
}
