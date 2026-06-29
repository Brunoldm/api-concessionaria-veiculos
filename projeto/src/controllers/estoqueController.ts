import { Request, Response } from "express";
import { EstoqueService } from "../services/estoqueService";

export class EstoqueController{
private estoqueService = new EstoqueService();

async listaTodosRegistroEstoque(req: Request, res: Response){
    try{
        const estoques = await this.estoqueService.listaTodosRegistroEstoque();
        res.status(200).json(estoques);

    } catch (error: any){
        res.status(400).json({
            message:error.message || "Erro do sistema"
        });
    }
}

async buscarRegistroDeEstoque(req: Request, res: Response){
    try{
        const id_estoque= req.params.id;

        const estoque = await this.estoqueService.buscarRegistroDeEstoque(id_estoque);

        res.status(200).json(estoque);
        
    } catch(error:any){

        res.status(error.status || 500).json({
            message:error.message || "Erro do sistema"
        })
    }
}

async buscarEstoqueEspecificoDeCarro(req: Request, res: Response){
    try{
        const id_carro= req.params.id_carro;

        const estoque = await this.estoqueService.buscarEstoqueEspecificoDeCarro(id_carro);

        res.status(200).json(estoque);
        
    } catch(error:any){

        res.status(error.status || 500).json({
            message:error.message || "Erro do sistema"
        })
    }
}

async criarNovoRegistroEstoque(req: Request, res: Response){
    try{
        const estoqueData: any = req.body

        const estoqueCadastrado = await this.estoqueService.criarNovoRegistroEstoque(estoqueData);

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

async atualizarEstoque(req: Request, res: Response){
    try{
        const estoqueData: any = req.body
        const id_estoque= req.params.id

        const estoqueAtualizado = await this.estoqueService.atualizarEstoque(id_estoque, estoqueData)

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

async removerRegistroEstoque(req: Request, res: Response){
    try{
    const id_estoque = req.params.id;

    await this.estoqueService.removerRegistroEstoque(id_estoque)

    res.status(200).json({
        message:"Estoque removido com sucesso"
    })
    
    }catch(error: any){
        res.status(error.status || 500).json ({
            message: error.message || "Erro do sistema"
        })
    }
}
}