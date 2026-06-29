import { executarComandoSQL } from "../database/mysql";
import { NotaFiscal } from "../models/NotaFiscal";

export class NotaFiscalRepository {
    private static instance: NotaFiscalRepository;

    static getCreateTableQuery(): string {
        return `
        CREATE TABLE IF NOT EXISTS NotaFiscal (
            id_nota INT AUTO_INCREMENT PRIMARY KEY, 
            numero_nota VARCHAR(255) NOT NULL UNIQUE, 
            data_emissao DATETIME NOT NULL,
            valor_total DECIMAL(10,2) NOT NULL,
            id_cliente INT NOT NULL,
            id_vendedor INT NOT NULL,
            id_carro INT NOT NULL,
            CONSTRAINT fk_nota_cliente FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
            CONSTRAINT fk_nota_vendedor FOREIGN KEY (id_vendedor) REFERENCES Vendedor(id_vendedor),
            CONSTRAINT fk_nota_carro FOREIGN KEY (id_carro) REFERENCES Carro(id_carro)
        );
    `;
    }  

    private constructor() { }

    static getInstance() {
        if (!this.instance) {
            this.instance = new NotaFiscalRepository();
        }
        return this.instance;
    }

    async listarTodasNotasFiscais(): Promise<NotaFiscal[]> {
        const linhas = await executarComandoSQL(
            "SELECT id_nota, numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro FROM NotaFiscal", 
            []
        );

        const notas: NotaFiscal[] = linhas.map((linha: any) => {
            return new NotaFiscal(
                linha.id_nota,
                linha.numero_nota,
                new Date(linha.data_emissao),
                Number(linha.valor_total),
                linha.id_cliente,
                linha.id_vendedor,
                linha.id_carro
            );
        });
 
        return notas;        
    }

    async buscarNotaFiscalPorId(id_nota: number): Promise<NotaFiscal | null> {
        const linhas = await executarComandoSQL(
            "SELECT id_nota, numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro FROM NotaFiscal WHERE id_nota = ?", 
            [id_nota]
        );

        if(linhas.length === 0){
            return null;
        }

        const linha = linhas[0];
        return new NotaFiscal(
            linha.id_nota,
            linha.numero_nota,
            new Date(linha.data_emissao),
            Number(linha.valor_total),
            linha.id_cliente,
            linha.id_vendedor,
            linha.id_carro
        );
    }

    async emitirNotaFiscal(notaFiscal: NotaFiscal): Promise<NotaFiscal> {
        const resultado = await executarComandoSQL(
            "INSERT INTO NotaFiscal (numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro) VALUES (?, ?, ?, ?, ?, ?)",
            [
                notaFiscal.numero_nota, 
                notaFiscal.data_emissao, 
                notaFiscal.valor_total, 
                notaFiscal.id_cliente, 
                notaFiscal.id_vendedor, 
                notaFiscal.id_carro
            ]
        );

        const idGerado = resultado.insertId;

        const newNota = new NotaFiscal(
            idGerado, 
            notaFiscal.numero_nota,
            notaFiscal.data_emissao,
            notaFiscal.valor_total,
            notaFiscal.id_cliente, 
            notaFiscal.id_vendedor, 
            notaFiscal.id_carro
        );

        console.log('Nota Fiscal emitida com sucesso:', newNota);
        return newNota;
    }

    async listarNotasFiscaisDeUmCliente(id_cliente: number): Promise<NotaFiscal[]> {
        const linhas = await executarComandoSQL(
            "SELECT id_nota, numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro FROM NotaFiscal WHERE id_cliente = ?", 
            [id_cliente]
        );

        const notas: NotaFiscal[] = linhas.map((linha: any) => {
            return new NotaFiscal(
                linha.id_nota,
                linha.numero_nota,
                new Date(linha.data_emissao),
                Number(linha.valor_total),
                linha.id_cliente,
                linha.id_vendedor,
                linha.id_carro
            );
        });

        return notas;
    }
}