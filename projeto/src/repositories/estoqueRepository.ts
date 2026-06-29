import { executarComandoSQL } from "../database/mysql";
import { Estoque } from "../models/Estoque";

export class EstoqueRepository{
    private static instance: EstoqueRepository;

    static getCreateTableQuery(): string {
        return `
        CREATE TABLE IF NOT EXISTS Estoque (
            id_estoque INT AUTO_INCREMENT PRIMARY KEY,
            id_carro INT NOT NULL, 
            quantidade INT NOT NULL, 
            localizacao_patio VARCHAR(150) NOT NULL,
            data_entrada DATE NOT NULL,
            FOREIGN KEY (id_carro) REFERENCES Carro(id_carro)
        );
    `;
    }  

    private constructor(){}

        static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository()
        }
        return this.instance
    }

    async listaTodosRegistroEstoque(): Promise<Estoque[]>{
        const linhas = await executarComandoSQL("SELECT id_estoque, id_carro, quantidade, localizacao_patio, data_entrada FROM Estoque", []);

        const estoques: Estoque[] = linhas.map((linha: any) => {
            return new Estoque(
            linha.id_estoque,
            linha.id_carro,
            linha.quantidade,
            linha.localizacao_patio,
            linha.data_entrada);
        });

        return estoques;
    }

    async buscarRegistroDeEstoque(id_estoque: number): Promise<Estoque | null>{
        const linhas = await executarComandoSQL(
            "SELECT id_estoque, id_carro, quantidade, localizacao_patio, data_entrada FROM Estoque WHERE id_estoque = ?", [id_estoque]
        );

        if(linhas.length === 0){
            return null;
        }

        const linha = linhas[0];
        return new Estoque(
            linha.id_estoque,
            linha.id_carro,
            linha.quantidade,
            linha.localizacao_patio,
            linha.data_entrada);
    }   

    async buscarEstoqueEspecificoDeCarro(id_carro: number): Promise<Estoque | null>{
        const linhas = await executarComandoSQL(
            "SELECT id_estoque, id_carro, quantidade, localizacao_patio, data_entrada From Estoque WHERE id_carro = ?", [id_carro]
        );

        if(linhas.length === 0){
            return null;
        }

        const linha = linhas[0];
        return new Estoque(
            linha.id_estoque,
            linha.id_carro,
            linha.quantidade,
            linha.localizacao_patio,
            linha.data_entrada);
    }

    async criarNovoRegistroEstoque(estoque: Estoque): Promise<Estoque>{
        const resultado = await executarComandoSQL(
            "INSERT INTO Estoque (id_carro, quantidade, localizacao_patio, data_entrada) VALUES (?, ?, ?, ?)",
            [estoque.id_carro, estoque.quantidade, estoque.localizacao_patio, estoque.data_entrada]
        );

        const idGerado = resultado.insertId;

        const newEstoque = new Estoque(idGerado, estoque.id_carro, estoque.quantidade, estoque.localizacao_patio, estoque.data_entrada);

        console.log('Novo estoque inserido com sucesso:', newEstoque);
        return newEstoque;
    }

    async atualizarEstoque(id_estoque: number, estoqueData: Estoque): Promise<Estoque>{

        const query = `UPDATE Estoque SET quantidade = ?, localizacao_patio = ? WHERE id_estoque = ?; `;

        try {
            const resultado = await executarComandoSQL(query, [
                estoqueData.quantidade, 
                estoqueData.localizacao_patio, 
                id_estoque
            ]);

        console.log("Estoque atualizado com sucesso:", resultado);

        const estoqueAtualizado = new Estoque(
        id_estoque,
        estoqueData.id_carro,
        estoqueData.quantidade,
        estoqueData.localizacao_patio,
        estoqueData.data_entrada
        );

        return new Promise<Estoque>((resolve)=>{
                resolve(estoqueAtualizado);
            })
         } catch (err: any) {
                console.error(`Erro ao atualizar o carro ${id_estoque}: ${err}`);
        throw err;
    }
    }

    async removerRegistroEstoque(estoque: Estoque): Promise<Estoque> {
    const query = "DELETE FROM Estoque WHERE id_estoque = ?;";

    try {
        await executarComandoSQL(query, [estoque.id_estoque]);
        console.log("Estoque removido com sucesso:", estoque);

        return new Promise<Estoque>((resolve) => {
            resolve(estoque);
        });

    } catch (err: any) {
        console.error(`Erro ao remover o estoque ${estoque.id_carro}: ${err}`);
        throw err;
    } 
    }
} 
