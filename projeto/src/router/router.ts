import { Router, Request, Response } from 'express';
import { EstoqueController } from "../controllers/estoqueController";
import { CarroController } from "../controllers/carroController";
import { ClienteController } from "../controllers/clienteController";

const router = Router();

const carroController = new CarroController();
const estoqueController = new EstoqueController();
const clienteController = new ClienteController();

// Rotas Carros
router.get("/carros", (req: Request, res: Response) => {carroController.listarTodosCarros(req, res);});

router.get("/carros/disponiveis", (req: Request, res: Response) => {carroController.obterCarrosDisponiveis(req, res);});

router.get("/carros/:id", (req: Request, res: Response) => {carroController.filtrarCarroPorID(req, res);});

router.post("/carros", (req: Request, res: Response) => {carroController.cadastrarNovoCarro(req, res);});

router.put("/carros/:id", (req: Request, res: Response) => {carroController.atualizarCarroPorID(req, res);});

router.delete("/carros/:id", (req: Request, res: Response) => {carroController.apagarCarroPorID(req, res);});

// Rotas Estoques
router.get("/estoques", (req: Request, res: Response) => {estoqueController.listaTodosRegistroEstoque(req, res);});

router.get("/estoques/carro/:id_carro", (req: Request, res: Response) => {estoqueController.buscarEstoqueEspecificoDeCarro(req, res);});

router.get("/estoques/:id", (req: Request, res: Response) => {estoqueController.buscarRegistroDeEstoque(req, res);});

router.post("/estoques", (req: Request, res: Response) => {estoqueController.criarNovoRegistroEstoque(req, res);});

router.put("/estoques/:id", (req: Request, res: Response) => {estoqueController.atualizarEstoque(req, res);});

router.delete("/estoques/:id", (req: Request, res: Response) => {estoqueController.removerRegistroEstoque(req, res);});

// Rotas Cliente
router.get("/clientes", (req, res) => {clienteController.listarTodosClientes(req, res);});
router.get("/clientes/:id", (req, res) => {clienteController.buscarCliente(req, res);});
router.post("/clientes", (req, res) => {clienteController.cadastrarNovoCliente(req, res);});
router.put("/clientes/:id", (req, res) => {clienteController.atualizarCliente(req, res);});
router.delete("/clientes/:id", (req, res) => {clienteController.deletarCliente(req, res);});
router.get("/clientes/notas/:id", (req, res) => {clienteController.listarNotasFiscaisDeUmCliente(req, res);});

export default router;