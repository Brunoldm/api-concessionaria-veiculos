import { Request, Response } from "express";
import { VendedorService } from "../services/vendedorService";

const vendedorService = new VendedorService();

export function listarTodosVendedores(req: Request, res: Response): void {
    try {
        const vendedores = vendedorService.listarTodosVendedores();
        res.status(200).json(vendedores);

    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message || "Erro do sistema"
        });
    }
}

export function buscarVendedorPorId(req: Request, res: Response): void {
    try {
        const id_vend = req.params.id;

        const vendedor = vendedorService.buscarVendedorPorId(id_vend);

        res.status(200).json(vendedor);
        
    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message || "Erro do sistema"
        });
    }
}

export function cadastrarNovoVendedor(req: Request, res: Response): void {
    try {
        const vendedorData: any = req.body;

        const vendedorCadastrado = vendedorService.cadastrarNovoVendedor(vendedorData);

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

export function atualizarVendedor(req: Request, res: Response): void {
    try {
        const vendedorData: any = req.body;
        const id_vend = req.params.id;

        const vendedorAtualizado = vendedorService.atualizarVendedor(id_vend, vendedorData);

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

export function removerVendedor(req: Request, res: Response): void {
    try {
        const id_vend = req.params.id;
        
        vendedorService.removerVendedor(id_vend);

        res.status(200).json("Vendedor removido com sucesso");
        
    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message || "Erro do sistema"
        });
    }
}

export function listarNotasFiscaisDeUmVendedor(req: Request, res: Response): void {
    try {
        const id_vend = req.params.id;
        
        const notas = vendedorService.listarNotasFiscaisDeUmVendedor(id_vend);

        res.status(200).json(notas);

    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message || "Erro do sistema"
        });
    }
}