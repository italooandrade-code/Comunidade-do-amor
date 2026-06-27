// Importa a conexão com o banco
const db = require("./db");

// Define a tabela progresso_tarot
const ProgressoTarot = db.sequelize.define("progresso_tarot", {

  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  usuarioId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },

  apresentacaoConcluida: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false
  },

  ultimaCarta: {
    type: db.Sequelize.INTEGER,
    defaultValue: 0
  },

  cartasLiberadas: {
    type: db.Sequelize.INTEGER,
    defaultValue: 2
  },

  proximaLiberacao: {
    type: db.Sequelize.DATE,
    allowNull: true
  }

});



// Exporta o model
module.exports = ProgressoTarot;
