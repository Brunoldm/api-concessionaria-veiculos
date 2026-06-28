import { Request , Response } from "express";
import { CarroService } from "../services/carroService";

export class CarroController{
    private carroService = new CarroService();

    async listarTodosCarros(req: Request, res: Response){
        try{
            const carros = await this.carroService.listarTodosCarros();
            res.status(200).json(carros);

        } catch (error: any){
            res.status(400).json({
                message:error.message || "Erro do sistema"
            });
        }
    }

    async filtrarCarroPorID(req: Request, res: Response){
        try{
            const id_carro= req.params.id;

            const carro = await this.carroService.filtrarCarroPorID(id_carro);

            res.status(200).json(carro);
        
        } catch(error:any){

            res.status(error.status || 500).json({
                message:error.message || "Erro do sistema"
            })
        }
    }

    async obterCarrosDisponiveis(req: Request,res: Response){
    try{
        const carros = await this.carroService.obterCarrosDisponiveis();
        res.status(200).json(carros);

    } catch (error: any){
        res.status(error.status || 500).json({
            message:error.message || "Erro do sistema"
        });
    }
}

    async cadastrarNovoCarro(req: Request, res: Response){
    try{
        const carroData: any = req.body

        const carroCadastrado = await this.carroService.cadastrarNovoCarro(carroData);

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

    async atualizarCarroPorID(req: Request, res: Response){
    try{
        const carroData: any = req.body
        const id_carro= req.params.id

        const carroAtualizado = await this.carroService.atualizarCarroPorID(id_carro, carroData)

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

    async apagarCarroPorID(req: Request, res: Response){
    try{
    const id_carro = req.params.id;
    
    await this.carroService.apagarCarroPorID(id_carro)

    res.status(200).json("Carro removido com sucesso")
    
    }catch(error: any){
        res.status(error.status || 500).json ({
            message: error.message || "Erro do sistema"
        })
    }
}
}
