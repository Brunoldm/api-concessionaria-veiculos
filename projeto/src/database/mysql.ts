import mysql, { Connection, QueryError } from 'mysql2';

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

export default mysqlConnection;