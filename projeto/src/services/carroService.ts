import { Carro } from "../models/Carro";
import { CarroRepository } from "../repositories/CarroRepository";

export class CarroService{

carroRepository : CarroRepository = CarroRepository.getInstance();

listarTodosCarros(): Carro []{
    return this.carroRepository.listaTodosCarros();
}

filtrarCarroPorID(id_carro: any): Carro | undefined{
    const idNUmber : number = parseInt (id_carro, 10);

    if(isNaN(idNUmber)){
        throw new Error("ID Inválido");
    }
    
    console.log(id_carro)
    return this.carroRepository.filtrarCarroPorID(idNUmber);
}

obterCarrosDisponiveis(){
    // Implementação apos criação da classe estoque
}

cadastrarNovoCarro(carroData : any): Carro {
    const{ marca, modelo, ano, placa, preco, cor} = carroData;
    if(!marca || !modelo || !ano || !placa || !preco || !cor ){
        throw new Error ("Informações incompletas");
    }

    const carroExistente = this.carroRepository.filtrarCarroPorPlaca(placa);
    if(carroExistente){
        throw new Error("Ja temos um carro com esta placa cadastrada");
    }

    if(preco <= 0){
        throw new Error("Preço Inválido");
    }

    const anoAtual = new Date().getFullYear();
    if(!Number.isInteger(ano) || ano < 1950 || ano > anoAtual+1){
        throw new Error("Ano Inválido");
    }

    //Regra do estoque apos a implementar a classe estoque

    const novoCarro = new Carro (marca, modelo, ano, placa, preco, cor);
    this.carroRepository.cadastrarCarro(novoCarro);
    return novoCarro;
}
}