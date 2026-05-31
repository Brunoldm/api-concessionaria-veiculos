import { Request, Response } from "express";
import { ClienteService } from "../services/clienteService";

const clienteService = new ClienteService();

export function listarTodosClientes(req: Request, res: Response): void {
    try {
        const clientes = clienteService.listarTodosClientes();
        res.status(200).json(clientes);
    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

export function buscarCliente(req: Request, res: Response): void {
    try {
        const cliente = clienteService.buscarCliente(req.params.id);
        res.status(200).json(cliente);
    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

export function cadastrarNovoCliente(req: Request, res: Response): void {
    try {
        const cliente = clienteService.cadastrarNovoCliente(req.body);
        res.status(201).json(cliente);
    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

export function atualizarCliente(req: Request, res: Response): void {
    try {
        const cliente = clienteService.atualizarCliente(
            req.params.id,
            req.body
        );

        res.status(200).json(cliente);
    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

export function deletarCliente(req: Request, res: Response): void {
    try {
        clienteService.deletarCliente(req.params.id);

        res.status(200).json({
            message: "Cliente removido com sucesso"
        });
    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}