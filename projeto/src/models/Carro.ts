export class Carro{

    id_carro: number | null;
    marca: string;
    modelo: string;
    ano: number;
    placa: string;
    preco: number;
    cor: string;

    constructor(id_carro: number | null,
        marca: string, modelo: string,
        ano: number,
        placa: string,
        preco: number,
        cor: string)
        {
        this.id_carro = id_carro;
        this.marca = marca
        this.modelo = modelo
        this.ano = ano
        this.placa = placa
        this.preco = preco
        this.cor = cor
    }
}