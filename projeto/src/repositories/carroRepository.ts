import { Carro } from "../models/Carro";

export class CarroRepository{
    private static instance: CarroRepository;
    private carroList : Carro [] = [];

    private constructor() {}

    public static getInstance (): CarroRepository{
        if(! this.instance){
            this.instance = new CarroRepository();
        }
        return this.instance;
    }

    listaTodosCarros(): Carro[]{
        return this.carroList;
    }

    filtrarCarroPorID(id_carro: number): Carro | undefined{
        return this.carroList.find( carro => carro.id_carro === id_carro);
    }

    cadastrarCarro( carro : Carro){
        this.carroList.push(carro);
    }

    atualizarCarroPorID(id_carro: number, carroData: Carro): Carro {

        const carro = this.carroList.find(carro => carro.id_carro === id_carro)!;

        carro.marca = carroData.marca;
        carro.modelo = carroData.modelo;
        carro.ano = carroData.ano;
        carro.placa = carroData.placa;
        carro.preco = carroData.preco;
        carro.cor = carroData.cor;

        return carro;
    }

    apagarCarroPorID(id_carro: number): Carro {
        const indice = this.carroList.findIndex(carro => carro.id_carro === id_carro);

        const carroApagado = this.carroList[indice];

        this.carroList.splice(indice,1);

        return carroApagado;
    }

    filtrarCarroPorPlaca(placa: string): Carro | undefined{
        return this.carroList.find(carro => carro.placa === placa);
    }
}