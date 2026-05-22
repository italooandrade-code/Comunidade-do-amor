// Importa a conexão com o banco
const db = require("./db");

// Define a tabela de usuários
const Usuario = db.sequelize.define("usuarios", {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  nome: {
    type: db.Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true
  },

  senha: {
    type: db.Sequelize.STRING,
    allowNull: true
  },

  status: {
    type: db.Sequelize.STRING,
    allowNull: false,
    defaultValue: "novo"
  },
 
  tipo: {
  type: db.Sequelize.STRING,
  allowNull: false,
  defaultValue: "cliente"
},
iaMensagensHoje: {
    type: db.Sequelize.INTEGER,
    defaultValue: 0
  },

  iaUltimoUso: {
    type: db.Sequelize.DATE,
    allowNull: true
  }


});

// Exporta o model Usuario
module.exports = Usuario;