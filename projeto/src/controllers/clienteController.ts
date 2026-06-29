import { Request, Response } from "express";
import { ClienteService } from "../services/clienteService";

export class ClienteController {
    private clienteService = new ClienteService();


async listarTodosClientes(req: Request, res: Response) {
    try {
        const clientes = await this.clienteService.listarTodosClientes();
        res.status(200).json(clientes);
    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

async buscarCliente(req: Request, res: Response) {
    try {
        const cliente = await this.clienteService.buscarCliente(req.params.id);
        res.status(200).json(cliente);
    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

async cadastrarNovoCliente(req: Request, res: Response) {
    try {
        const cliente = await this.clienteService.cadastrarNovoCliente(req.body);
        res.status(201).json(cliente);
    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

async atualizarCliente(req: Request, res: Response) {
    try {
        const cliente = await this.clienteService.atualizarCliente(
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

async deletarCliente(req: Request, res: Response) {
    try {
        await this.clienteService.deletarCliente(req.params.id);

        res.status(200).json({
            message: "Cliente removido com sucesso"
        });
    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

async listarNotasFiscaisDeUmCliente(req: Request, res: Response) {
    try {
        const id_cliente = req.params.id;
        const notas = await this.clienteService.listarNotasFiscaisDeUmCliente(id_cliente);
        
        res.status(200).json(notas);
    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message || "Erro do sistema"
        });
    }
}
}