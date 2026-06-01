import express from "express";
import {listarTodosCarros, filtrarCarroPorID, obterCarrosDisponiveis, cadastrarNovoCarro, 
    atualizarCarroPorID, apagarCarroPorID} from "./controllers/carroController"
import {listaTodosRegistroEstoque, buscarRegistroDeEstoque, buscarEstoqueEspecificoDeCarro, 
    criarNovoRegistroEstoque, atualizarEstoque, removerRegistroEstoque} from "./controllers/estoqueController"
import { listarTodosVendedores, buscarVendedorPorId, cadastrarNovoVendedor, atualizarVendedor,
     removerVendedor, listarNotasFiscaisDeUmVendedor } from "./controllers/vendedorController";
import {listarTodosClientes, buscarCliente, cadastrarNovoCliente, atualizarCliente, deletarCliente} from "./controllers/clienteController";
import { listarTodasNotasFiscais, buscarNotaFiscalPorId, emitirNotaFiscal } from "./controllers/notaFiscalController";

const app = express();

const PORT = process.env.PORT ?? 3000;
app.use(express.json())

function logInfo(){
    console.log(`API em execução no URL:http :localhost:${PORT}`);
}

app.get("/api/carros", listarTodosCarros);
app.get("/api/carros/:id",filtrarCarroPorID);
app.get("/api/carros/disponiveis",obterCarrosDisponiveis);
app.post("/api/carros",cadastrarNovoCarro);
app.put("/api/carros/:id",atualizarCarroPorID);
app.delete("/api/carros/:id",apagarCarroPorID);

app.get("/api/estoque", listaTodosRegistroEstoque);
app.get("/api/estoque/:id", buscarRegistroDeEstoque);
app.get("/api/estoque/carro/:id_carro",buscarEstoqueEspecificoDeCarro);
app.post("/api/estoque", criarNovoRegistroEstoque);
app.put("/api/estoque/:id", atualizarEstoque);
app.delete("/api/estoque/:id", removerRegistroEstoque);

app.get("/api/vendedores", listarTodosVendedores);
app.get("/api/vendedores/:id", buscarVendedorPorId);
app.post("/api/vendedores", cadastrarNovoVendedor);
app.put("/api/vendedores/:id", atualizarVendedor);
app.delete("/api/vendedores/:id", removerVendedor);
app.get("/api/vendedores/notas/:id", listarNotasFiscaisDeUmVendedor);

app.get("/api/clientes", listarTodosClientes);
app.get("/api/clientes/:id", buscarCliente);
app.post("/api/clientes", cadastrarNovoCliente);
app.put("/api/clientes/:id", atualizarCliente);
app.delete("/api/clientes/:id", deletarCliente);

app.get("/api/notas", listarTodasNotasFiscais);
app.get("/api/notas/:id", buscarNotaFiscalPorId);
app.post("/api/notas", emitirNotaFiscal);

app.listen (PORT, logInfo)