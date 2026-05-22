// Importa o Sequelize
const Sequelize = require("sequelize");



const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
  }
);

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
};

// Testa a conexão com o banco
sequelize.authenticate()
  .then(() => {
    console.log("Conectado ao banco com sucesso!");
  })
  .catch((erro) => {
    console.log("Falha ao conectar com o banco:", erro);
  });

// Exporta para outros arquivos usarem
module.exports = {
  Sequelize,
  sequelize
};