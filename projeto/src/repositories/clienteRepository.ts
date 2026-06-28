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

    async listarCliente(): Promise<Cliente[]> {
        const linhas = await executarComandoSQL("SELECT * FROM cliente", []);
        return (linhas as any[]).map(linha =>
            new Cliente(linha.id_cliente, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade)
        );
    }

    async buscarClientePorId(id: number): Promise<Cliente | null> {
        const linhas = await executarComandoSQL("SELECT * FROM cliente WHERE id_cliente = ?", [id]);
        if (linhas.length === 0) return null;
        const linha = linhas[0];
        return new Cliente(linha.id_cliente, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade);
    }

    async adicionarCliente(cliente: Cliente): Promise<Cliente> {
        const resultado = await executarComandoSQL(
            "INSERT INTO cliente (nome, cpf, telefone, email, cidade) VALUES (?, ?, ?, ?, ?)",
            [cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.cidade]
        );
        return new Cliente(resultado.insertId, cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.cidade);
    }

    async atualizarClientePorId(id: number, clienteData: Cliente): Promise<boolean> {
        const resultado = await executarComandoSQL(
            "UPDATE cliente SET nome = ?, cpf = ?, telefone = ?, email = ?, cidade = ? WHERE id_cliente = ?",
            [clienteData.nome, clienteData.cpf, clienteData.telefone, clienteData.email, clienteData.cidade, id]
        );
        return resultado.affectedRows > 0;
    }

    async removerCliente(id: number): Promise<boolean> {
        const resultado = await executarComandoSQL("DELETE FROM cliente WHERE id_cliente = ?", [id]);
        return resultado.affectedRows > 0;
    }
}