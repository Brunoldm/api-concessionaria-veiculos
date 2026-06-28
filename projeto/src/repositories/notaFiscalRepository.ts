import { NotaFiscal } from "../models/NotaFiscal"; 

export class NotaFiscalRepository {
    private static instance: NotaFiscalRepository;
    private notaFiscalList: NotaFiscal[] = [];

    private constructor() {}

    public static getInstance(): NotaFiscalRepository {
        if (!this.instance) {
            this.instance = new NotaFiscalRepository();
        }
        return this.instance;
    }

    listarTodasNotasFiscais(): NotaFiscal[] {
        return this.notaFiscalList;
    }

    buscarNotaFiscalPorId(id_nota: number): NotaFiscal {
        return this.notaFiscalList.find(nota => nota.id_nota === id_nota)!;
    }   

    emitirNotaFiscal(notaFiscal: NotaFiscal): void {
        this.notaFiscalList.push(notaFiscal);
    }

    listarNotasFiscaisDeUmCliente(id_cliente: number): NotaFiscal[] {
    return this.notaFiscalList.filter(
        nota => nota.id_cliente === id_cliente
    );
}
}