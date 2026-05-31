import { Request, Response } from "express";
import { EstoqueService } from "../services/estoqueService";

const estoqueService = new EstoqueService();

export function listaTodosRegistroEstoque(req: Request, res: Response): void{
    try{
        const estoques = estoqueService.listaTodosRegistroEstoque();
        res.status(200).json(estoques);

    } catch (error: any){
        res.status(400).json({
            message:error.message || "Erro do sistema"
        });
    }
}

export function buscarRegistroDeEstoque(req: Request, res: Response): void{
    try{
        const id_estoque= req.params.id;

        const estoque = estoqueService.buscarRegistroDeEstoque(id_estoque);

        res.status(200).json(estoque);
        
    } catch(error:any){

        res.status(error.status || 500).json({
            message:error.message || "Erro do sistema"
        })
    }
}

export function buscarEstoqueEspecificoDeCarro(req: Request, res: Response): void{
    try{
        const id_carro= req.params.id_carro;

        const estoque = estoqueService.buscarEstoqueEspecificoDeCarro(id_carro);

        res.status(200).json(estoque);
        
    } catch(error:any){

        res.status(error.status || 500).json({
            message:error.message || "Erro do sistema"
        })
    }
}

export function criarNovoRegistroEstoque(req: Request, res: Response): void{
    try{
        const estoqueData: any = req.body

        const estoqueCadastrado = estoqueService.criarNovoRegistroEstoque(estoqueData);

        res.status(201).json({
            message:"Estoque adicionado com sucesso",
            estoque: estoqueCadastrado
        });
    }

    catch(error: any){
        res.status(error.status || 500).json({
            message:error.message || "Erro do sistema"
        })
    }
}

export function atualizarEstoque(req: Request, res: Response): void{
    try{
        const estoqueData: any = req.body
        const id_estoque= req.params.id

        const estoqueAtualizado = estoqueService.atualizarEstoque(id_estoque, estoqueData)

        res.status(200).json({
            message: "Estoque Atualizado",
            estoque: estoqueAtualizado
        })
    }
    catch(error: any){
        res.status(error.status || 500).json({
            message:error.message || "Erro do sistema"
        })
    }
}

export function removerRegistroEstoque(req: Request, res: Response): void{
    try{
    const id_estoque = req.params.id;

    estoqueService.removerRegistroEstoque(id_estoque)

    res.status(200).json({
        message:"Estoque removido com sucesso"
    })
    
    }catch(error: any){
        res.status(error.status || 500).json ({
            message: error.message || "Erro do sistema"
        })
    }
}
