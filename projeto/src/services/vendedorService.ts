import { Vendedor } from "../models/Vendedor";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";

export class VendedorService {

    private vendedorRepository: VendedorRepository = VendedorRepository.getInstance();
    private notaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance();

    async listarTodosVendedores(): Promise<Vendedor[]> {
        return await this.vendedorRepository.listaTodosVendedores();
    }

    async buscarVendedorPorId(id_vend: any): Promise<Vendedor> {
        const idNumber: number = parseInt(id_vend, 10);

        if (isNaN(idNumber)) {
            throw { status: 400, message: "ID Inválido" };
        }

        const vendedor = await this.vendedorRepository.filtrarVendedorPorID(idNumber);

        if (!vendedor) {
            throw { status: 404, message: "Vendedor não encontrado" };
        }

        return vendedor;
    }

    async cadastrarNovoVendedor(vendedorData: any): Promise<Vendedor> {
        const { nome, matricula, comissao_percentual } = vendedorData;

        if (!nome || !matricula || comissao_percentual == null) {
            throw { status: 400, message: "Informações incompletas preencha nome, matricula e comissao_percentual." };
        }

        if (comissao_percentual < 0 || comissao_percentual > 30) {
            throw { status: 400, message: "A comissão deve ser um valor entre 0 e 30" };
        }

        const matriculaJaExiste = await this.vendedorRepository.filtrarVendedorPorMatricula(matricula);
        
        if (matriculaJaExiste) {
            throw { status: 409, message: "Ja existe um vendedor cadastrado com esta matricula." };
        }

        const novoVendedor = new Vendedor(null, nome, matricula, comissao_percentual);
        
        return await this.vendedorRepository.cadastrarVendedor(novoVendedor);
    }

    async atualizarVendedor(id_vend: any, vendedorData: any): Promise<Vendedor> {
        const idNumber: number = parseInt(id_vend, 10);
        const { nome, matricula, comissao_percentual } = vendedorData;

        if (isNaN(idNumber)) {
            throw { status: 400, message: "ID Invalido" };
        }

        if (!nome || !matricula || comissao_percentual == null) {
            throw { status: 400, message: "Informações incompletas para atualização" };
        }

        if (comissao_percentual < 0 || comissao_percentual > 30) {
            throw { status: 400, message: "A comissão deve ser um valor entre 0 e 30" };
        }

        const vendedorExistente = await this.vendedorRepository.filtrarVendedorPorID(idNumber);

        if (!vendedorExistente) {
            throw { status: 404, message: "Vendedor não encontrado" };
        }

        const matriculaEmUso = await this.vendedorRepository.filtrarVendedorPorMatricula(matricula);
        
        if (matriculaEmUso && matriculaEmUso.id_vendedor !== idNumber) {
            throw { status: 409, message: "essa matricula  esta sendo usada por outro vendedor" };
        }

        const vendedorParaAtualizar = new Vendedor(idNumber, nome, matricula, comissao_percentual);

        return await this.vendedorRepository.atualizarVendedorPorID(idNumber, vendedorParaAtualizar);
    }

    async removerVendedor(id_vend: any): Promise<Vendedor> {
        const idNumber: number = parseInt(id_vend, 10);

        if (isNaN(idNumber)) {
            throw { status: 400, message: "ID Invalido" };
        }

        const vendedorExistente = await this.vendedorRepository.filtrarVendedorPorID(idNumber);

        if (!vendedorExistente) {
            throw { status: 404, message: "Vendedor não encontrado" };
        }

        const todasNotas = await this.notaFiscalRepository.listarTodasNotasFiscais();
        const notasDoVendedor = todasNotas.filter(nota => nota.id_vendedor === idNumber);

        if (notasDoVendedor.length > 0) {
            throw { status: 422, message: "o vendedor possui notas fiscais vinculadas,não pode ser removido" };
        }

        return await this.vendedorRepository.apagarVendedorPorID(vendedorExistente);
    }

    async listarNotasFiscaisDeUmVendedor(id_vend: any) {
        const idNumber: number = parseInt(id_vend, 10);

        if (isNaN(idNumber)) {
            throw { status: 400, message: "ID Invalido" };
        }

        const vendedorExistente = await this.vendedorRepository.filtrarVendedorPorID(idNumber);

        if (!vendedorExistente) {
            throw { status: 404, message: "Vendedor não encontrado" };
        }

        const todasNotas = await this.notaFiscalRepository.listarTodasNotasFiscais();
        const notasDoVendedor = todasNotas.filter(nota => nota.id_vendedor === idNumber);

        if (notasDoVendedor.length === 0) {
            throw { status: 404, message: "esse vendedor não possui notas fiscais." };
        }

        return notasDoVendedor;
    }
}