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

    filtrarCarrosDisponiveis(){
        // Implementação apos criação da classe estoque
    }

    cadastrarCarro( carro : Carro){
        this.carroList.push(carro);
    }

    atualizarCarroPorID(id_carro: number, carroAtualizado: Carro): Carro | undefined{
        const indice = this.carroList.findIndex(carro => carro.id_carro === id_carro);

        if(indice !== -1){
            this.carroList[indice] = carroAtualizado;

            return this.carroList[indice];
        }

        return undefined;
    }

    apagarCarroPorID(id_carro: number): Carro | undefined{
        const indice = this.carroList.findIndex(carro => carro.id_carro === id_carro);

        if(indice !== -1){
            const carroApagado = this.carroList[indice];

            this.carroList.splice(indice,1);

            return carroApagado;
        }

        return undefined
    }
}