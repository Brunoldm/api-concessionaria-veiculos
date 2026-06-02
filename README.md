# API REST - Concessionária de Veículos 🚗

Este projeto é uma API desenvolvida para materia de Desenvolvimento WEB

**Instituição:** Instituto Federal de São Paulo (IFSP) - Câmpus Boituva  
**Professor:** Prof. Dr. Anisio Silva  

## 👥 Integrantes do Grupo
* Bruno Loureiro De Melo
* João Felipe Guimarães Queiroz Santos
* Leandro Yunoguthi

---

## 🎯 Objetivo do Projeto
Desenvolver uma API REST para gestão de uma concessionária de veículos utilizando a **Arquitetura MVC**. O sistema permite o gerenciamento completo do cadastro de clientes, vendedores e carros, o controle de estoque em memória e a emissão de notas fiscais de venda, seguindo rigorosamente as regras de negócio estabelecidas.

## 🛠️ Tecnologias Utilizadas
* **Node.js** com **Express** (Criação do servidor e rotas)
* **TypeScript** (Tipagem estática e orientação a objetos)
* **Postman** (Testes de endpoints)

## 📁 Estrutura do Projeto (MVC)
O projeto segue uma separação de responsabilidades em quatro camadas:
* `models/`: Definição de classes e tipos.
* `repositories/`: Persistência de dados em memória (padrão Singleton) e operações CRUD.
* `services/`: Concentração de todas as regras de negócio e validações.
* `controllers/`: Tratamento de requisições e respostas HTTP (Status 200, 201, 400, 404, 409 e 422).

