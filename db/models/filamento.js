/*
 * Cada instância dessa classe representa um rolo de filamento em estoque
 */

module.exports = (squelize, DataTypes) => {
  var Filamento = squelize.define('Filamento', {
    codigo: {
      type: DataTypes.STRING(10),
      unique: true
    },
    polimero: DataTypes.STRING(10),
    aberto: DataTypes.BOOLEAN,
    cor: DataTypes.STRING(10),
    diametro: DataTypes.REAL,
    responsavel: DataTypes.STRING(3),
    origem: DataTypes.STRING(10),
    massa: DataTypes.INTEGER
  });

  return Filamento;
}
