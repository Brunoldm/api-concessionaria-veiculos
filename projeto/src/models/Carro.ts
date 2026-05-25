
class Carro{
    private static contadorId_carro = 1;

    id_carro: number;
    marca: string;
    modelo: string;
    ano: number;
    placa: string;
    preco: number;
    cor: string;

    constructor(marca: string, modelo: string, ano: number, placa: string, preco: number, cor: string){
        this.id_carro = Carro.contadorId_carro++
        this.marca = marca
        this.modelo = modelo
        this.ano = ano
        this.placa = placa
        this.preco = preco
        this.cor = cor
    }
}