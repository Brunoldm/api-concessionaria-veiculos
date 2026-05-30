import { Vendedor } from "../models/Vendedor"; 

export class VendedorRepository {
    private static instance: VendedorRepository;
    private vendedorList: Vendedor[] = [];

    private constructor() {}

    public static getInstance(): VendedorRepository {
        if (!this.instance) {
            this.instance = new VendedorRepository();
        }
        return this.instance;
    }

    listarTodosVendedores(): Vendedor[] {
        return this.vendedorList;
    }

    buscarVendedorPorId(id_vendedor: number): Vendedor {
        return this.vendedorList.find(vendedor => vendedor.id_vendedor === id_vendedor)!;
    }   

    criarNovoVendedor(vendedor: Vendedor): void {
        this.vendedorList.push(vendedor);
    }

    atualizarVendedor(id_vendedor: number, vendedorData: Vendedor): Vendedor {
        const vendedor = this.vendedorList.find(v => v.id_vendedor === id_vendedor)!;

        vendedor.nome = vendedorData.nome;
        vendedor.matricula = vendedorData.matricula;
        vendedor.comissao_percentual = vendedorData.comissao_percentual;

        return vendedor;
    }

    removerVendedor(id_vendedor: number): Vendedor {
        const indice = this.vendedorList.findIndex(vendedor => vendedor.id_vendedor === id_vendedor);
        
        const vendedorApagado = this.vendedorList[indice];
        
        this.vendedorList.splice(indice, 1);
        
        return vendedorApagado;
    }    
}