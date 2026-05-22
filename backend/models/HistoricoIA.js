// importa conexão
const db = require("./db");

// cria tabela
const HistoricoIA = db.sequelize.define("historico_ia", {

  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  usuarioId: {
    type: db.Sequelize.INTEGER,
    allowNull: false
  },

  pergunta: {
    type: db.Sequelize.TEXT,
    allowNull: false
  },

  resposta: {
    type: db.Sequelize.TEXT,
    allowNull: false
  }

});

// exporta model
module.exports = HistoricoIA;