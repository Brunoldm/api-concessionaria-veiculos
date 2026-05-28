export class Estoque{
    private static contadorId_Estoque = 1;

    id_estoque: number;
    id_carro: number;
    quantidade: number
    localizacao_patio: string;
    data_entrada: Date;

    constructor(id_carro: number, quantidade: number, localizacao_patio: string, data_entrada: Date){

        this.id_estoque = Estoque.contadorId_Estoque++
        this.id_carro = id_carro
        this.quantidade = quantidade
        this.localizacao_patio = localizacao_patio
        this.data_entrada = data_entrada
    }

}