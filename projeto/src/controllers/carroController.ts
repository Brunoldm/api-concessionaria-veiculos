import { Request , Response } from "express";
import { CarroService } from "../services/CarroService";

const carroService = new CarroService();

export function listarTodosCarros(req: Request, res: Response): void{
    try{
        const carros = carroService.listarTodosCarros();
        res.status(200).json(carros);

    } catch (error: any){
        res.status(400).json({
            message:error.message || "Erro do sistema"
        });
    }
}

export function filtrarCarroPorID(req: Request, res: Response): void{
    try{
        const id_carro= req.params.id;

        const carro = carroService.filtrarCarroPorID(id_carro);

        res.status(200).json(carro);
        
    } catch(error:any){

        res.status(error.status || 500).json({
            message:error.message || "Erro do sistema"
        })
    }
}

export function obterCarrosDisponiveis(req: Request,res: Response): void{
    try{
        const carros = carroService.obterCarrosDisponiveis();
        res.status(200).json(carros);

    } catch (error: any){
        res.status(400).json({
            message:error.message || "Erro do sistema"
        });
    }
}

export function cadastrarNovoCarro(req: Request, res: Response): void{
    try{
        const carroData: any = req.body

        const carroCadastrado = carroService.cadastrarNovoCarro(carroData);

        res.status(201).json({
            message:"Carro cadastrado com sucesso",
            carro: carroCadastrado
        });
    }

    catch(error: any){
        res.status(error.status || 500).json({
            message:error.message || "Erro do sistema"
        })
    }
}

export function atualizarCarroPorID(req: Request, res: Response): void{
    try{
        const carroData: any = req.body
        const id_carro= req.params.id

        const carroAtualizado = carroService.atualizarCarroPorID(id_carro, carroData)

        res.status(200).json({
            message: "Carro Atualizado",
            carro: carroAtualizado
        })
    }
    catch(error: any){
        res.status(error.status || 500).json({
            message:error.message || "Erro do sistema"
        })
    }
}

export function apagarCarroPorID(req: Request, res: Response): void{
    try{
    const id_carro = req.params.id;
    
    carroService.apagarCarroPorID(id_carro)

    res.status(200).json("Carro removido com sucesso")
    
    }catch(error: any){
        res.status(error.status || 500).json ({
            message: error.message || "Erro do sistema"
        })
    }
}


