export class Vendedor{
    private static contadorVendedor= 1;

    id_vendedor: number;
    nome: string;
    matricula: string;
    comissao_percentual: number;;

    constructor(nome: string, matricula: string, comissao_percentual: number){

        this.id_vendedor = Vendedor.contadorVendedor++
        this.nome = nome
        this.matricula = matricula
        this.comissao_percentual = comissao_percentual
    }
}