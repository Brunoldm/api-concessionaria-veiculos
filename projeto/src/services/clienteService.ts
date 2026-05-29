import { Cliente } from "../models/Cliente";
import {listarClientes, buscarClientePorId, adicionarCliente, atualizarClientePorId, removerCliente} from "../repositories/clienteRepository";

export function listarTodosClientes(): Cliente[] {
    return listarClientes();
}

export function buscarCliente(id: any): Cliente | undefined {
    const idNumber: number = parseInt(id, 10);

    if (isNaN(idNumber)) {
        throw {
            status: 400,
            message: "ID inválido"
        }
    }

    const cliente = buscarClientePorId(idNumber);

    if (!cliente) {
        throw {
            status: 404,
            message: "Cliente não encontrado"
        }
    }

    return cliente;
}

export function cadastrarNovoCliente(clienteData: Cliente): Cliente {
    const { nome, cpf, telefone, email, cidade } = clienteData;

    if (!nome || !cpf || !telefone) {
        throw {
            status: 400,
            message: "Informações incompletas"
        }
    }

    const cpfExistente = listarClientes().find(
        cliente => cliente.cpf === cpf
    );

    if (cpfExistente) {
        throw {
            status: 409,
            message: "CPF já cadastrado"
        }
    }

    const novoCliente = new Cliente(nome, cpf, telefone, email, cidade);

    adicionarCliente(novoCliente);

    return novoCliente;
}

export function atualizarCliente(id: any, clienteData: Cliente): Cliente | undefined {

    const idNumber: number = parseInt(id, 10);

    if (isNaN(idNumber)) {
        throw {
            status: 400,
            message: "ID inválido"
        }
    }

    const clienteExistente = buscarClientePorId(idNumber);

    if (!clienteExistente) {
        throw {
            status: 404,
            message: "Cliente não encontrado"
        }
    }

    return atualizarClientePorId(idNumber, clienteData);
}

export function deletarCliente(id: any): boolean {
    const idNumber: number = parseInt(id, 10);

    if (isNaN(idNumber)) {
        throw {
            status: 400,
            message: "ID inválido"
        }
    }

    const clienteExistente = buscarClientePorId(idNumber);

    if (!clienteExistente) {
        throw {
            status: 404,
            message: "Cliente não encontrado"
        }
    }

    return removerCliente(idNumber);
}