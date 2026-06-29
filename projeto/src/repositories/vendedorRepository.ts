import { executarComandoSQL } from "../database/mysql";
import { Vendedor } from "../models/Vendedor";

export class VendedorRepository {
    private static instance: VendedorRepository;

    static getCreateTableQuery(): string {
        return `
        CREATE TABLE IF NOT EXISTS Vendedor (
            id_vendedor INT AUTO_INCREMENT PRIMARY KEY, 
            nome VARCHAR(255) NOT NULL, 
            matricula VARCHAR(255) NOT NULL UNIQUE, 
            comissao_percentual DECIMAL(10,2) NOT NULL
        );
    `;
    }  

    private constructor() { }

    static getInstance() {
        if (!this.instance) {
            this.instance = new VendedorRepository();
        }
        return this.instance;
    }

    async listaTodosVendedores(): Promise<Vendedor[]> {
        const linhas = await executarComandoSQL("SELECT id_vendedor, nome, matricula, comissao_percentual FROM Vendedor", []);

        const vendedores: Vendedor[] = linhas.map((linha: any) => {
            return new Vendedor(
                linha.id_vendedor,
                linha.nome,
                linha.matricula,
                Number(linha.comissao_percentual)
            );
        });
 
        return vendedores;        
    }

    async filtrarVendedorPorID(id_vendedor: number): Promise<Vendedor | null> {
        const linhas = await executarComandoSQL(
            "SELECT id_vendedor, nome, matricula, comissao_percentual FROM Vendedor WHERE id_vendedor = ?", [id_vendedor]
        );

        if(linhas.length === 0){
            return null;
        }

        const linha = linhas[0];
        return new Vendedor(
            linha.id_vendedor,
            linha.nome,
            linha.matricula,
            Number(linha.comissao_percentual)
        );
    }

    async cadastrarVendedor(vendedor: Vendedor): Promise<Vendedor> {
        const resultado = await executarComandoSQL(
            "INSERT INTO Vendedor (nome, matricula, comissao_percentual) VALUES (?, ?, ?)",
            [vendedor.nome, vendedor.matricula, vendedor.comissao_percentual]
        );

        const idGerado = resultado.insertId;

        const newVendedor = new Vendedor(idGerado, vendedor.nome, vendedor.matricula, vendedor.comissao_percentual);

        console.log('Vendedor inserido com sucesso:', newVendedor);
        return newVendedor;
    }

    async atualizarVendedorPorID(id_vendedor: number, vendedorData: Vendedor): Promise<Vendedor> {
        const query = `UPDATE Vendedor SET nome = ?, matricula = ?, comissao_percentual = ? WHERE id_vendedor = ?; `;

        try {
            const resultado = await executarComandoSQL(query, [
                vendedorData.nome,
                vendedorData.matricula,
                vendedorData.comissao_percentual,
                id_vendedor
            ]);

            console.log("Vendedor atualizado com sucesso:", resultado);
            return new Promise<Vendedor>((resolve)=>{
                resolve(vendedorData);
            });
         } catch (err: any) {
            console.error(`Erro ao atualizar o vendedor ${id_vendedor}: ${err}`);
            throw err;
        }
    }      

    async apagarVendedorPorID(vendedor: Vendedor): Promise<Vendedor> {
        const query = "DELETE FROM Vendedor WHERE id_vendedor = ?;";

        try {
            await executarComandoSQL(query, [vendedor.id_vendedor]);
            console.log("Vendedor removido com sucesso:", vendedor);

            return new Promise<Vendedor>((resolve) => {
                resolve(vendedor);
            });

        } catch (err: any) {
            console.error(`Erro ao remover o vendedor ${vendedor.id_vendedor}: ${err}`);
            throw err;
        }
    }

    async filtrarVendedorPorMatricula(matricula: string): Promise<Vendedor | null> {
        const query = `SELECT id_vendedor, nome, matricula, comissao_percentual FROM Vendedor WHERE matricula = ?; `;
        const linhas = await executarComandoSQL(query, [matricula]);

        if (linhas.length === 0) {
            return null;
        }

        const linha = linhas[0];

        return new Vendedor(
            linha.id_vendedor,
            linha.nome,
            linha.matricula,
            Number(linha.comissao_percentual)
        );
    }
}