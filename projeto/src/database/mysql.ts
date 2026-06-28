import mysql, { Connection, QueryError } from 'mysql2';
import { ClienteRepository } from "../repository/ClienteRepository";

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'mysql',
  database: 'api-concessionaria-veiculos'
};

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

mysqlConnection.connect((err: QueryError | null) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
  }
  console.log('Conexao bem-sucedida com o banco de dados MySQL');
});

export function executarComandoSQL(query: string, valores: any[]): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    mysqlConnection.query(query, valores, (err, resultado) => {
      if (err) {
        console.error('Erro ao executar a query.', err);
        reject(err);
      }

      resolve(resultado);
    });
  });
}

export async function inicializarBanco(): Promise<void> {
  console.log("Sincronizando schemas do banco de dados...");

  const schemas = [
    ClienteRepository.getCreateTableQuery(),

  ];

try {
    await executarComandoSQL(`USE ${dbConfig.database}`, []);
    console.log(`Conectado ao schema: ${dbConfig.database}`);

    for (const query of schemas) {
        await executarComandoSQL(query, []);
    }
    console.log("Todos os repositórios foram inicializados com sucesso.");
} catch (err) {
    console.error("Erro crítico na sincronização dos repositórios:", err);
    process.exit(1);
}
}

export default mysqlConnection;