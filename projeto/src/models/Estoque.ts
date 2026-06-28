export class Estoque{

    id_estoque: number | null;
    id_carro: number;
    quantidade: number
    localizacao_patio: string;
    data_entrada: Date;

    constructor(id_estoque: number | null,
        id_carro: number,
        quantidade: number,
        localizacao_patio: string,
        data_entrada: Date){

        this.id_estoque = id_estoque;
        this.id_carro = id_carro
        this.quantidade = quantidade
        this.localizacao_patio = localizacao_patio
        this.data_entrada = data_entrada
    }
}