import express from "express";
import {listarTodosCarros, filtrarCarroPorID, obterCarrosDisponiveis, cadastrarNovoCarro, 
    atualizarCarroPorID, apagarCarroPorID} from "./controllers/carroController"
import {listaTodosRegistroEstoque, buscarRegistroDeEstoque, buscarEstoqueEspecificoDeCarro, 
    criarNovoRegistroEstoque, atualizarEstoque, removerRegistroEstoque} from "./controllers/estoqueController"

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

app.listen (PORT, logInfo)