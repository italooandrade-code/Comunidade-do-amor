const db = require("./db");

const ProgressoIniciacao = db.sequelize.define("progresso_iniciacao", {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  usuarioId: {
    type: db.Sequelize.INTEGER,
    allowNull: false
  },

  diaAtual: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },

  checklistYoga: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false
  },

  checklistRitual: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false
  },

  checklistAcao: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false
  },

  ultimoDiaConcluidoEm: {
    type: db.Sequelize.DATE,
    allowNull: true
  },

    iniciacaoConcluida: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false
  }

}, {
  freezeTableName: true
});

module.exports = ProgressoIniciacao;

