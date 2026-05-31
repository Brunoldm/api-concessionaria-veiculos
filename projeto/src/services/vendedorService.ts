import { Vendedor } from "../models/Vendedor";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";

export class VendedorService {

    private vendedorRepository: VendedorRepository = VendedorRepository.getInstance();
    private notaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance();

    listarTodosVendedores(): Vendedor[] {
        return this.vendedorRepository.listarTodosVendedores();
    }

    buscarVendedorPorId(id_vend: any): Vendedor {
        const idNumber: number = parseInt(id_vend, 10);

        if (isNaN(idNumber)) {
            throw { status: 400, message: "ID Inválido" };
        }

        const vendedor = this.vendedorRepository.buscarVendedorPorId(idNumber);

        if (!vendedor) {
            throw { status: 404, message: "Vendedor não encontrado" };
        }

        return vendedor;
    }

    cadastrarNovoVendedor(vendedorData: any): Vendedor {
        const { nome, matricula, comissao_percentual } = vendedorData;

        if (!nome || !matricula || comissao_percentual == null) {
            throw { status: 400, message: "Informações incompletas preencha nome, matricula e comissao_percentual." };
        }

        if (comissao_percentual < 0 || comissao_percentual > 30) {
            throw { status: 400, message: "A comissão deve ser um valor entre 0 e 30" };
        }

        const todosVendedores = this.vendedorRepository.listarTodosVendedores();
        const matriculaJaExiste = todosVendedores.find(v => v.matricula === matricula);
        
        if (matriculaJaExiste) {
            throw { status: 409, message: "Ja existe um vendedor cadastrado" };
        }

        const novoVendedor = new Vendedor(nome, matricula, comissao_percentual);
        this.vendedorRepository.criarNovoVendedor(novoVendedor);
        
        return novoVendedor;
    }

    atualizarVendedor(id_vend: any, vendedorData: any): Vendedor {
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

        const vendedorExistente = this.vendedorRepository.buscarVendedorPorId(idNumber);

        if (!vendedorExistente) {
            throw { status: 404, message: "Vendedor não encontrado" };
        }

        const todosVendedores = this.vendedorRepository.listarTodosVendedores();
        const matriculaEmUso = todosVendedores.find(v => v.matricula === matricula && v.id_vendedor !== idNumber);
        
        if (matriculaEmUso) {
            throw { status: 409, message: "essa matricula  esta sendo usada por outro vendedor" };
        }

        return this.vendedorRepository.atualizarVendedor(idNumber, vendedorData);
    }

    removerVendedor(id_vend: any): Vendedor {
        const idNumber: number = parseInt(id_vend, 10);

        if (isNaN(idNumber)) {
            throw { status: 400, message: "ID Invalido" };
        }

        const vendedorExistente = this.vendedorRepository.buscarVendedorPorId(idNumber);

        if (!vendedorExistente) {
            throw { status: 404, message: "Vendedor não encontrado" };
        }

        const todasNotas = this.notaFiscalRepository.listarTodasNotasFiscais();
        const notasDoVendedor = todasNotas.filter(nota => nota.id_vendedor === idNumber);

        if (notasDoVendedor.length > 0) {
            throw { status: 422, message: "o vendedor possui notas fiscais vinculadas,não pode ser removido" };
        }

        return this.vendedorRepository.removerVendedor(idNumber);
    }

    listarNotasFiscaisDeUmVendedor(id_vend: any) {
        const idNumber: number = parseInt(id_vend, 10);

        if (isNaN(idNumber)) {
            throw { status: 400, message: "ID Invalido" };
        }

        const vendedorExistente = this.vendedorRepository.buscarVendedorPorId(idNumber);

        if (!vendedorExistente) {
            throw { status: 404, message: "Vendedor não encontrado" };
        }

        const todasNotas = this.notaFiscalRepository.listarTodasNotasFiscais();
        const notasDoVendedor = todasNotas.filter(nota => nota.id_vendedor === idNumber);

        if (notasDoVendedor.length === 0) {
            throw { status: 404, message: "esse vendedor não possui notas fiscais." };
        }

        return notasDoVendedor;
    }
}