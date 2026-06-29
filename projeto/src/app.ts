import express from "express";
import router from "./router/router";
import { inicializarBanco } from "./database/mysql";

const app = express();

const PORT = process.env.PORT ?? 3000;
app.use(express.json())

app.use('/api', router);

async function startServer() {
    await inicializarBanco();

    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}

startServer();