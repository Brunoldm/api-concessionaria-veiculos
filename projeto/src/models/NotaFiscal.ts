export class NotaFiscal{
    private static contadorNotaFiscal= 1;

    id_nota: number;
    numero_nota: string;
    data_emissao: Date
    valor_total: number;
    id_cliente: number;
    id_vendedor: number;
    id_carro: number;

    constructor(numero_nota: string, data_emissao: Date, valor_total: number, id_cliente: number, id_vendedor: number, id_carro: number){

        this.id_nota = NotaFiscal.contadorNotaFiscal++
        this.numero_nota = numero_nota
        this.data_emissao = data_emissao
        this.valor_total = valor_total
        this.id_cliente = id_cliente
        this.id_vendedor = id_vendedor
        this.id_carro = id_carro
    }
}