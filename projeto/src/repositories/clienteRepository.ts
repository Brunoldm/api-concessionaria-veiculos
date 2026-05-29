import { Cliente } from "../models/Cliente";

const clientes: Cliente[] = [];

export function listarClientes(): Cliente[] {
    return clientes;
}

export function buscarClientePorId(id: number): Cliente | undefined {
    return clientes.find(cliente => cliente.id_cliente === id);
}

export function adicionarCliente(cliente: Cliente): void {
    clientes.push(cliente);
}

export function atualizarClientePorId(id: number, clienteData: Cliente): Cliente | undefined {
    const cliente = clientes.find(cliente => cliente.id_cliente === id);

    if(cliente){
        cliente.nome = clienteData.nome;
        cliente.cpf = clienteData.cpf;
        cliente.telefone = clienteData.telefone;
        cliente.email = clienteData.email;
        cliente.cidade = clienteData.cidade;
    }

    return cliente;
}

export function removerCliente(id: number): boolean {
    const indice = clientes.findIndex(cliente => cliente.id_cliente === id);

    if (indice !== -1) {
        clientes.splice(indice, 1);
        return true;
    }

    return false;
}