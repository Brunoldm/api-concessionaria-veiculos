import { Request, Response } from "express";
import { NotaFiscalService } from "../services/notaFiscalService";

const notaFiscalService = new NotaFiscalService();

export function listarTodasNotasFiscais(req: Request, res: Response): void {
    try {
        const notas = notaFiscalService.listarTodasNotasFiscais();
        res.status(200).json(notas);

    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message || "Erro do sistema"
        });
    }
}

export function buscarNotaFiscalPorId(req: Request, res: Response): void {
    try {
        const id_nota = req.params.id;

        const nota = notaFiscalService.buscarNotaFiscalPorId(id_nota);

        res.status(200).json(nota);
        
    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message || "Erro do sistema"
        });
    }
}

export function emitirNotaFiscal(req: Request, res: Response): void {
    try {
        const notaFiscalData: any = req.body;

        const notaEmitida = notaFiscalService.emitirNotaFiscal(notaFiscalData);

        res.status(201).json({
            message: "Nota Fiscal emitida com sucesso",
            notaFiscal: notaEmitida
        });

    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message || "Erro do sistema"
        });
    }
}