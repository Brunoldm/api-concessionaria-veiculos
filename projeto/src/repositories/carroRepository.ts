import { executarComandoSQL } from "../database/mysql";
import { Carro } from "../models/Carro";

export class CarroRepository{
    private static instance: CarroRepository

    static getCreateTableQuery(): string {
        return `
        CREATE TABLE IF NOT EXISTS Carro (
            id_carro INT AUTO_INCREMENT PRIMARY KEY, 
            marca VARCHAR(255) NOT NULL, 
            modelo VARCHAR(255) NOT NULL,
            ano INT NOT NULL,
            placa VARCHAR(255) NOT NULL UNIQUE,
            preco DECIMAL(10,2) NOT NULL,
            cor VARCHAR(255) NOT NULL
        );
    `;
    }  

    private constructor() { }

    static getInstance() {
        if (!this.instance) {
            this.instance = new CarroRepository()
        }
        return this.instance
    }

    async listaTodosCarros(): Promise<Carro[]> {
        const linhas = await executarComandoSQL("SELECT id_carro, marca, modelo, ano, placa, preco, cor FROM Carro", []);

        const carros: Carro[] = linhas.map((linha: any) => {
            return new Carro(
            linha.id_carro,
            linha.marca,
            linha.modelo,
            Number(linha.ano),
            linha.placa,
            Number(linha.preco),
            linha.cor);
        });
 
        return carros;        
    }

    async filtrarCarroPorID(id_carro: number): Promise<Carro | null>{
        const linhas = await executarComandoSQL(
            "SELECT id_carro, marca, modelo, ano, placa, preco, cor FROM Carro WHERE id_carro = ?", [id_carro]
        );

        if(linhas.length === 0){
            return null;
        }

        const linha = linhas[0];
        return new Carro(
            linha.id_carro,
            linha.marca,
            linha.modelo,
            Number(linha.ano),
            linha.placa,
            Number(linha.preco),
            linha.cor);
    }

    async cadastrarCarro( carro : Carro): Promise<Carro>{
        const resultado = await executarComandoSQL(
            "INSERT INTO Carro (marca, modelo, ano, placa, preco, cor) VALUES (?, ?, ?, ?, ?, ?)",
            [carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor]
        );

        const idGerado = resultado.insertId;

        const newCarro = new Carro(idGerado, carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor);

        console.log('Carro inserido com sucesso:', newCarro);
        return newCarro;
    }

    async atualizarCarroPorID(id_carro: number, carroData: Carro): Promise<Carro> {
        const query = `UPDATE Carro SET marca = ?, modelo = ?, ano = ?, placa = ?, preco = ?, cor = ? WHERE id_carro = ?; `;

        try {
            const resultado = await executarComandoSQL(query, [
                carroData.marca,
                carroData.modelo,
                carroData.ano,
                carroData.placa,
                carroData.preco,
                carroData.cor,
                id_carro
            ]);

        console.log("Carro atualizado com sucesso:", resultado);
        return new Promise<Carro>((resolve)=>{
                resolve(carroData);
            })
         } catch (err: any) {
                console.error(`Erro ao atualizar o carro ${id_carro}: ${err}`);
        throw err;
    }
}      

    async apagarCarroPorID(carro: Carro): Promise<Carro> {
    const query = "DELETE FROM Carro WHERE id_carro = ?;";

    try {
        await executarComandoSQL(query, [carro.id_carro]);
        console.log("Carro removido com sucesso:", carro);

        return new Promise<Carro>((resolve) => {
            resolve(carro);
        });

    } catch (err: any) {
        console.error(`Erro ao remover o carro ${carro.id_carro}: ${err}`);
        throw err;
    }
}

    async filtrarCarroPorPlaca(placa: string): Promise<Carro | null> {
    const query = `SELECT id_carro, marca, modelo, ano, placa, preco, cor FROM Carro WHERE placa = ?; `;
    const linhas = await executarComandoSQL(query, [placa]);

    if (linhas.length === 0) {
        return null;
    }

    const linha = linhas[0];

    return new Carro(
        linha.id_carro,
        linha.marca,
        linha.modelo,
        Number(linha.ano),
        linha.placa,
        Number(linha.preco),
        linha.cor
    );
}
}