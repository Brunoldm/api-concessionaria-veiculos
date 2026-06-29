export class Vendedor{
    id_vendedor: number | null;
    nome: string;
    matricula: string;
    comissao_percentual: number;;

    constructor(id_vendedor: number | null, nome: string, matricula: string, comissao_percentual: number){

        this.id_vendedor = id_vendedor
        this.nome = nome
        this.matricula = matricula
        this.comissao_percentual = comissao_percentual
    }
}