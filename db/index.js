const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'estoque.db'
});

// Importa os modelos
db = {};
fs.readdirSync('./db/models/').forEach(filename => {
    var model = sequelize.import('./models/' + filename);
    db[model.name] = model;
})

// Executa as associações
Object.values(db).forEach(model => {
    if(model.associate) model.associate(db);
})

sequelize.sync({ alter: true });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes

module.exports = db;