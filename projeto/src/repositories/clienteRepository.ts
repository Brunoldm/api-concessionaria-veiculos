import { Cliente } from "../models/Cliente";
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

    static getCreateTableQuery(): string {
        return `
            CREATE TABLE IF NOT EXISTS cliente (
                id_cliente INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                cpf VARCHAR(20) UNIQUE NOT NULL,
                telefone VARCHAR(20) NOT NULL,
                email VARCHAR(255),
                cidade VARCHAR(100)
            );
        `;
    }

    async listarClientes(): Promise<Cliente[]> {
        const linhas = await executarComandoSQL(
            "SELECT id_cliente, nome, cpf, telefone, email, cidade FROM cliente",
            []
        );

        const clientes: Cliente[] = linhas.map((linha: any) => {
            return new Cliente(
                linha.id_cliente,
                linha.nome,
                linha.cpf,
                linha.telefone,
                linha.email,
                linha.cidade
            );
        });

        return new Promise<Cliente[]>((resolve) => {
            resolve(clientes);
        });
    }

    async buscarClientePorId(id: number): Promise<Cliente | null> {
        const linhas = await executarComandoSQL(
            "SELECT * FROM cliente WHERE id_cliente = ?",
            [id]
        );

        if (linhas.length === 0) {
            return new Promise<null>((resolve) => {
                resolve(null);
            });
        }

        const linha = linhas[0];

        const cliente = new Cliente(
            linha.id_cliente,
            linha.nome,
            linha.cpf,
            linha.telefone,
            linha.email,
            linha.cidade
        );

        return new Promise<Cliente>((resolve) => {
            resolve(cliente);
        });
    }

    async adicionarCliente(cliente: Cliente): Promise<Cliente> {
        const resultado = await executarComandoSQL(
            "INSERT INTO cliente (nome, cpf, telefone, email, cidade) VALUES (?, ?, ?, ?, ?)",
            [cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.cidade]
        );

        const newCliente = new Cliente(
            resultado.insertId,
            cliente.nome,
            cliente.cpf,
            cliente.telefone,
            cliente.email,
            cliente.cidade
        );

        console.log("Cliente inserido com sucesso:", newCliente);

        return new Promise<Cliente>((resolve) => {
            resolve(newCliente);
        });
    }

    async atualizarClientePorId(id_cliente: number, clienteData: Cliente): Promise<Cliente> {
        const query = `
            UPDATE cliente 
            SET nome = ?, cpf = ?, telefone = ?, email = ?, cidade = ?
            WHERE id_cliente = ?;
        `;

        try {
            await executarComandoSQL(query, [
                clienteData.nome,
                clienteData.cpf,
                clienteData.telefone,
                clienteData.email,
                clienteData.cidade,
                id_cliente
            ]);

            return new Promise<Cliente>((resolve) => {
                resolve(clienteData);
            });

        } catch (err: any) {
            console.error(`Erro ao atualizar o cliente ${id_cliente}: ${err}`);
            throw err;
        }
    }

    async removerCliente(id_cliente: number): Promise<Cliente | null> {
        try {
            const linhas = await executarComandoSQL(
                "SELECT * FROM cliente WHERE id_cliente = ?",
                [id_cliente]
            );

            if (linhas.length === 0) {
                return new Promise<null>((resolve) => {
                    resolve(null);
                });
            }

            const clienteRemovido = new Cliente(
                linhas[0].id_cliente,
                linhas[0].nome,
                linhas[0].cpf,
                linhas[0].telefone,
                linhas[0].email,
                linhas[0].cidade
            );

            await executarComandoSQL(
                "DELETE FROM cliente WHERE id_cliente = ?",
                [id_cliente]
            );

            console.log("Cliente removido com sucesso:", clienteRemovido);

            return new Promise<Cliente>((resolve) => {
                resolve(clienteRemovido);
            });

        } catch (err: any) {
            console.error(`Erro ao remover o cliente ${id_cliente}: ${err}`);
            throw err;
        }
    }
}