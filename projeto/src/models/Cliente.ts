export class Cliente{
    private static contadorId_cliente = 1;

    id_cliente: number;
    nome: string;
    cpf: string;
    telefone: string;
    email?: string;
    cidade?: string;

    constructor(nome: string, cpf: string, telefone: string, email?: string, cidade?: string){
        this.id_cliente = Cliente.contadorId_cliente++
        this.nome = nome
        this.cpf = cpf
        this.telefone = telefone
        this.email = email
        this.cidade = cidade
    }
}