// Importa o Sequelize
const Sequelize = require("sequelize");

// Cria a conexão com o banco comunidade_amor no MySQL/XAMPP
const sequelize = new Sequelize("comunidade_amor", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false
});

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