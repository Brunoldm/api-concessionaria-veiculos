import { Estoque } from "../models/Estoque";
import { CarroRepository } from "../repositories/carroRepository";
import { EstoqueRepository } from "../repositories/estoqueRepository";

export class EstoqueService{

private estoqueRepository : EstoqueRepository = EstoqueRepository.getInstance();
private carroRepository : CarroRepository = CarroRepository.getInstance(); 

listaTodosRegistroEstoque(): Estoque[]{
    return this.estoqueRepository.listaTodosRegistroEstoque();
}

buscarRegistroDeEstoque(id_estoque: any): Estoque {
    const idNUmber : number = parseInt (id_estoque, 10);

    if(isNaN(idNUmber)){
        throw{
            status:400,
            message: "ID invalido"
        }
    }
    
    const estoque = this.estoqueRepository.buscarRegistroDeEstoque(idNUmber);
    
    if(!estoque){
    throw{
        status:404,
        message:"Estoque não encontrado para este carro"
    }
}
    return estoque;
}

buscarEstoqueEspecificoDeCarro(id_carro: any): Estoque {
    const idNUmber : number = parseInt (id_carro, 10);

    if(isNaN(idNUmber)){
        throw{
            status:400,
            message: "ID invalido"
        }
    }
    
    const estoque = this.estoqueRepository.buscarEstoqueEspecificoDeCarro(idNUmber);
    
    if(!estoque){
    throw{
        status:400,
        message:"Estoque não encontrado para este carro"
    }
}
    return estoque;
}

criarNovoRegistroEstoque(estoqueData: Estoque): Estoque {
    const {id_carro, quantidade, localizacao_patio, data_entrada} = estoqueData;

     if(!id_carro || quantidade == null || !localizacao_patio || !data_entrada){
        throw{
            status:400,
             message:"Informações incompletas"
        }
    } 
    
    const carro = this.carroRepository.filtrarCarroPorID(id_carro)

    if(!carro){
        throw{
            status:404,
            message: "Carro não encontrado"
        }
    }

    if(!Number.isInteger(quantidade) || quantidade < 0)
        {throw{
            status:400,
            message:"Quantidade inválida"
    }
}

    const dataEntrada = new Date(data_entrada);
    const hoje = new Date();

    if(dataEntrada > hoje){
        throw{
            status:400,
            message:"Data de entrada errada, não é possivel cadastrar data futura"
        }
    }

    const estoqueExistente = this.estoqueRepository.buscarEstoqueEspecificoDeCarro(id_carro);

    if(estoqueExistente){
        throw{
            status:409,
            message: "Já existe estoque para este carro"
        }
    }

    const novoEstoque = new Estoque (id_carro, quantidade, localizacao_patio, data_entrada);
    this.estoqueRepository.criarNovoRegistroEstoque(novoEstoque);
    return novoEstoque;
}

atualizarEstoque(id_estoq: any, estoqueData: any): Estoque{
    const id_estoque : number = parseInt(id_estoq,10)
    const {quantidade, localizacao_patio} = estoqueData;

    if(isNaN(id_estoque)){
        throw {
            status:400,
            message:"ID Inválido"
        }
    } 

    if(quantidade == null || !localizacao_patio){
        throw{
            status:400,
            message: "informações incompletas"
        }
    }

    const estoque =this.estoqueRepository.buscarRegistroDeEstoque(id_estoque);

    if(!estoque){
    throw{
        status:404,
        message:"Estoque não encontrado"
    }
}

    if(!Number.isInteger(quantidade) || quantidade < 0)
        {throw{
            status:400,
            message:"Quantidade inválida"
    }
}

    const estoqueAtualizado = this.estoqueRepository.atualizarEstoque(id_estoque, estoqueData);
    return estoqueAtualizado;
}

removerRegistroEstoque(id_estoq: any): Estoque{
    const idNumber : number = parseInt(id_estoq,10)

    if(isNaN(idNumber)){
        throw {
            status:400,
            message:"ID Inválido"
        }
    }
    
    const estoque = this.estoqueRepository.buscarRegistroDeEstoque(idNumber)

    if(!estoque){
        throw{
            status:404,
            message:"ID não encontrado"
        }
    }

    const estoqueApagado = this.estoqueRepository.removerRegistroEstoque(idNumber);

    return estoqueApagado;
}
}
