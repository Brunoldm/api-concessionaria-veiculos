import { Carro } from "../models/Carro";
import { CarroRepository } from "../repositories/carroRepository";
import { EstoqueRepository } from "../repositories/estoqueRepository";

export class CarroService{

private carroRepository : CarroRepository = CarroRepository.getInstance();
private estoqueRepository : EstoqueRepository = EstoqueRepository.getInstance();

async listarTodosCarros(): Promise<Carro[]>{
    return this.carroRepository.listaTodosCarros();
}

async filtrarCarroPorID(id_carro: any): Promise<Carro>{
    const idNUmber : number = parseInt (id_carro, 10);

    if(isNaN(idNUmber)){
        throw{
            status:400,
            message: "ID invalido"
        }
    }
    
    const carro = await this.carroRepository.filtrarCarroPorID(idNUmber);
    
    if(!carro){
    throw{
        status:404,
        message:"Carro não encontrado"
    }
}
    return carro;
}

async obterCarrosDisponiveis(): Promise<Carro[]> {

    const carros = await this.carroRepository.listaTodosCarros();

    const carrosDisponiveis: Carro[] = [];

    for(const carro of carros){

        const estoque = await this.estoqueRepository.buscarEstoqueEspecificoDeCarro(carro.id_carro);

        if(estoque && estoque.quantidade > 0){
            carrosDisponiveis.push(carro);
        }
    }

    return carrosDisponiveis;
}

async cadastrarNovoCarro(carroData : any): Promise<Carro> {
    const{ marca, modelo, ano, placa, preco, cor} = carroData;
    if(!marca || !modelo || !ano || !placa || preco == null || !cor ){
        throw{
            status:400,
             message:"Informações incompletas"
        }
    }

    const carroExistente = await this.carroRepository.filtrarCarroPorPlaca(placa);
    if(carroExistente){
        throw{
            status:409,
            message:"Ja temos um carro com esta placa cadastrada"
        }
    }

    if(preco <= 0){
        throw{
            status:400,
            message:"Preço Inválido"
        }
    }

    const anoAtual = new Date().getFullYear();
    if(!Number.isInteger(ano) || ano < 1950 || ano > anoAtual+1){
        throw {
            status:400,
            message:"Ano Inválido"
        }
    }

    const novoCarro = new Carro ( null, marca, modelo, ano, placa, preco, cor);
    return await this.carroRepository.cadastrarCarro(novoCarro);
}

async atualizarCarroPorID(id_car: any, carroData: any): Promise<Carro>{
    const id_carro : number = parseInt(id_car, 10);
    const{ marca, modelo, ano, placa, preco, cor} = carroData;

    if(isNaN(id_carro)){
        throw {
            status:400,
            message:"ID Inválido"
        }
    }

    if(!marca || !modelo || !ano || !placa || preco == null || !cor ){
        throw{
            status:400,
            message:"Informações incompletas"
        }
    }

    if(preco <= 0){
        throw{
            status:400,
            message:"Preço Inválido"
        }
    }

    const anoAtual = new Date().getFullYear();
    if(!Number.isInteger(ano) || ano < 1950 || ano > anoAtual+1){
        throw {
            status:400,
            message:"Ano Inválido"
        }
    }

    const carroExistente = await this.carroRepository.filtrarCarroPorID(id_carro);

    if(!carroExistente){
        throw{
            status:404,
            message:"ID do carro não existe"
        }
    }

    const carroPlaca = await this.carroRepository.filtrarCarroPorPlaca(placa);

    if(carroPlaca && carroPlaca.id_carro !== id_carro){
        throw {
            status:409,
            message:"Ja temos um carro com esta placa cadastrada"
        }
    }

    return await this.carroRepository.atualizarCarroPorID(id_carro, carroData)
}
    
async apagarCarroPorID(id_carro: any): Promise<Carro> {
    const idNumber : number = parseInt (id_carro, 10);

    if(isNaN(idNumber)){
        throw {
            status:400,
            message:"ID Inválido"
        }
    }

    const carroExistente = await this.carroRepository.filtrarCarroPorID(idNumber)

    if(!carroExistente){
        throw{
            status:404,
            message:"ID do carro não existe"
        }
    }

    const carroEstoque = await this.estoqueRepository.buscarEstoqueEspecificoDeCarro(idNumber);

    if(carroEstoque){
        throw{
            status:422,
            message:"Carro possui registro de estoque, não é possivel deletar"
        }
    }

    return await this.carroRepository.apagarCarroPorID(carroExistente);
}
}