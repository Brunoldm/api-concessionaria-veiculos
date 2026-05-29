import { Estoque } from "../models/Estoque";

export class EstoqueRepository{
    private static instance: EstoqueRepository;
    private estoqueList: Estoque [] = [];

    private constructor(){}

    public static getInstance (): EstoqueRepository{
        if(! this.instance){
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }

    listaTodosRegistroEstoque(): Estoque[]{
        return this.estoqueList;
    }

    buscarRegistroDeEstoque(id_estoque: number): Estoque{
        return this.estoqueList.find(estoque => estoque.id_estoque === id_estoque)!;
    }   

    buscarEstoqueEspecificoDeCarro(id_carro: number): Estoque{
        return this.estoqueList.find(car => car.id_carro === id_carro)!;
    }

    criarNovoRegistroEstoque(estoque: Estoque){
        this.estoqueList.push(estoque)
    }

    atualizarQuantidadeLocalizacao(id_estoque: number, estoqueData: Estoque): Estoque{

        const estoque = this.estoqueList.find(estoque => estoque.id_estoque === id_estoque)!;

        estoque.localizacao_patio = estoqueData.localizacao_patio;
        estoque.quantidade = estoqueData.quantidade;

        return estoque;
    }

    removerRegistroEstoque(id_estoque: number): Estoque {
        const indice = this.estoqueList.findIndex(estoque => estoque.id_carro === id_estoque);

        const estoqueApagado = this.estoqueList[indice];

        this.estoqueList.splice(indice,1);

        return estoqueApagado;
    }    
}