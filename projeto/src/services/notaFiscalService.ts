import { NotaFiscal } from "../models/NotaFiscal";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
import { EstoqueRepository } from "../repositories/estoqueRepository";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { ClienteRepository } from "../repositories/clienteRepository"; 
import { CarroRepository } from "../repositories/carroRepository";

export class NotaFiscalService {

    private notaFiscalRepository = NotaFiscalRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();
    private vendedorRepository = VendedorRepository.getInstance();
    private clienteRepository = ClienteRepository.getInstance();
    private carroRepository = CarroRepository.getInstance();

    async listarTodasNotasFiscais(): Promise<NotaFiscal[]> {
        return await this.notaFiscalRepository.listarTodasNotasFiscais();
    }

    async buscarNotaFiscalPorId(id_not: any): Promise<NotaFiscal> {
        const idNumber: number = parseInt(id_not, 10);

        if (isNaN(idNumber)) {
            throw { status: 400, message: "ID Inválido" };
        }

        const nota = await this.notaFiscalRepository.buscarNotaFiscalPorId(idNumber);

        if (!nota) {
            throw { status: 404, message: "Nota Fiscal não encontrada" };
        }

        return nota;
    }

    async emitirNotaFiscal(notaFiscalData: any): Promise<NotaFiscal> {
        const { numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro } = notaFiscalData;

        if (!numero_nota || !data_emissao || valor_total == null || !id_cliente || !id_vendedor || !id_carro) {
            throw { status: 400, message: "Informações incompletas,todos os campos são obrigatórios." };
        }

        if (valor_total <= 0) {
            throw { status: 400, message: "O valor total da nota fiscal deve ser  maior que zero." };
        }

        const todasNotas = await this.notaFiscalRepository.listarTodasNotasFiscais();
        const notaJaExiste = todasNotas.find((n: NotaFiscal) => n.numero_nota === numero_nota);
        if (notaJaExiste) {
            throw { status: 409, message: "Já existe uma nota fiscal emitida com este número." };
        }

        const dataEmissaoConvertida = new Date(data_emissao);
        const hoje = new Date();
        if (dataEmissaoConvertida > hoje) {
            throw { status: 400, message: "Data de emissão inválida." };
        }

        const clienteExistente = await this.clienteRepository.buscarClientePorId(id_cliente); 
        if (!clienteExistente) {
            throw { status: 404, message: "Cliente não encontrado no sistema." };
        }

        const vendedorExistente = await this.vendedorRepository.filtrarVendedorPorID(id_vendedor);
        if (!vendedorExistente) {
            throw { status: 404, message: "Vendedor não encontrado no sistema." };
        }

        const carroExistente = await this.carroRepository.filtrarCarroPorID(id_carro);
        if (!carroExistente) {
            throw { status: 404, message: "Carro não encontrado no sistema." };
        }

        const estoqueDoCarro = await this.estoqueRepository.buscarEstoqueEspecificoDeCarro(id_carro);
        
        if (!estoqueDoCarro) {
            throw { status: 404, message: "registro de estoque não encontrado para este carro." };
        }

        if (estoqueDoCarro.quantidade <= 0) {
            throw { status: 422, message: "Estoque insuficiente para emitir a nota." };
        }

        estoqueDoCarro.quantidade -= 1;
        
        await this.estoqueRepository.atualizarEstoque(estoqueDoCarro.id_estoque!, estoqueDoCarro);

        const novaNota = new NotaFiscal(
            null, 
            numero_nota, 
            dataEmissaoConvertida, 
            valor_total, 
            id_cliente, 
            id_vendedor, 
            id_carro
        );
        
        return await this.notaFiscalRepository.emitirNotaFiscal(novaNota);
    }
}