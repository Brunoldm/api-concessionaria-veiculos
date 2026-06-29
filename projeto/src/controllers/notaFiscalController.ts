import { Request, Response } from "express";
import { NotaFiscalService } from "../services/notaFiscalService";

export class NotaFiscalController {
    private notaFiscalService = new NotaFiscalService();

    async listarTodasNotasFiscais(req: Request, res: Response) {
        try {
            const notas = await this.notaFiscalService.listarTodasNotasFiscais();
            res.status(200).json(notas);

        } catch (error: any) {
            res.status(error.status || 500).json({
                message: error.message || "Erro do sistema"
            });
        }
    }

    async buscarNotaFiscalPorId(req: Request, res: Response) {
        try {
            const id_nota = req.params.id;

            const nota = await this.notaFiscalService.buscarNotaFiscalPorId(id_nota);

            res.status(200).json(nota);
            
        } catch (error: any) {
            res.status(error.status || 500).json({
                message: error.message || "Erro do sistema"
            });
        }
    }

    async emitirNotaFiscal(req: Request, res: Response) {
        try {
            const notaFiscalData: any = req.body;

            const notaEmitida = await this.notaFiscalService.emitirNotaFiscal(notaFiscalData);

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
}