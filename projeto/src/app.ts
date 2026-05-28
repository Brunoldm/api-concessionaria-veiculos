import express from "express";
import {listarTodosCarros, filtrarCarroPorID, obterCarrosDisponiveis, cadastrarNovoCarro, 
    atualizarCarroPorID, apagarCarroPorID} from "./controllers/carroController"

const app = express();

const PORT = process.env.Port ?? 3000;
app.use(express.json())

function logInfo(){
    console.log(`API em execução no URL:http :localhost:${PORT}`);
}

app.get("/api/carros", listarTodosCarros);
app.get("api/carros/:id",filtrarCarroPorID);
app.get("api/carros/disponiveis",obterCarrosDisponiveis);
app.post("api/carros",cadastrarNovoCarro);
app.put("/api/carros/:id",atualizarCarroPorID);
app.delete("api/carros/:id",apagarCarroPorID);

app.listen (PORT, logInfo)