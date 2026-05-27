import { Request , Response } from "express";
import { CarroService } from "../services/CarroService";

const carroService = new CarroService();

export function listarTodosCarros(req: Request, res: Response): void{
    try{
        const carros = carroService.listarTodosCarros();
        res.status(200).json(carros);

    } catch (error: any){
        res.status(400).json({message: error.message});
    }
}

export function filtrarCarroPorID(req: Request, res: Response): void{
    try{
        const id_carro= req.params.id_carro;

        const carro = carroService.filtrarCarroPorID(id_carro);

        if(!carro){
            res.status(404).json({message: "Carro não encontrado"});
            return ;
        }

        res.status(200).json(carro);
        
    } catch(error:any){

        res.status(400).json({
            message: error.message
        })
    }
}

export function obterCarrosDisponiveis(){
    // Implementação apos criação da classe estoque
}



