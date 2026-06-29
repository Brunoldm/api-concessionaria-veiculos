import { Request, Response } from "express";
import { VendedorService } from "../services/vendedorService";

export class VendedorController {
    private vendedorService = new VendedorService();

    async listarTodosVendedores(req: Request, res: Response) {
        try {
            const vendedores = await this.vendedorService.listarTodosVendedores();
            res.status(200).json(vendedores);

        } catch (error: any) {
            res.status(error.status || 500).json({
                message: error.message || "Erro do sistema"
            });
        }
    }

    async buscarVendedorPorId(req: Request, res: Response) {
        try {
            const id_vend = req.params.id;

            const vendedor = await this.vendedorService.buscarVendedorPorId(id_vend);

            res.status(200).json(vendedor);
            
        } catch (error: any) {
            res.status(error.status || 500).json({
                message: error.message || "Erro do sistema"
            });
        }
    }

    async cadastrarNovoVendedor(req: Request, res: Response) {
        try {
            const vendedorData: any = req.body;

            const vendedorCadastrado = await this.vendedorService.cadastrarNovoVendedor(vendedorData);

            res.status(201).json({
                message: "Vendedor cadastrado com sucesso",
                vendedor: vendedorCadastrado
            });

        } catch (error: any) {
            res.status(error.status || 500).json({
                message: error.message || "Erro do sistema"
            });
        }
    }

    async atualizarVendedor(req: Request, res: Response) {
        try {
            const vendedorData: any = req.body;
            const id_vend = req.params.id;

            const vendedorAtualizado = await this.vendedorService.atualizarVendedor(id_vend, vendedorData);

            res.status(200).json({
                message: "Vendedor Atualizado",
                vendedor: vendedorAtualizado
            });

        } catch (error: any) {
            res.status(error.status || 500).json({
                message: error.message || "Erro do sistema"
            });
        }
    }

    async removerVendedor(req: Request, res: Response) {
        try {
            const id_vend = req.params.id;
            
            await this.vendedorService.removerVendedor(id_vend);

            res.status(200).json({
                message: "Vendedor removido com sucesso"
            });
            
        } catch (error: any) {
            res.status(error.status || 500).json({
                message: error.message || "Erro do sistema"
            });
        }
    }

    async listarNotasFiscaisDeUmVendedor(req: Request, res: Response) {
        try {
            const id_vend = req.params.id;
            
            const notas = await this.vendedorService.listarNotasFiscaisDeUmVendedor(id_vend);

            res.status(200).json(notas);

        } catch (error: any) {
            res.status(error.status || 500).json({
                message: error.message || "Erro do sistema"
            });
        }
    }
}