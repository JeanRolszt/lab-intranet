/*
 * Cada instância dessa classe representa um prefixo de código do filamento
 * Ex.: PL122: Prefixo "PL" que significa PLA + LAB, e o contador dessa classe "122"
 */

module.exports = (sequelize, DataTypes) => {
  var FilamentoContadorClasse = sequelize.define('FilamentoContadorClasse', {
    codigo: {
      type: DataTypes.STRING(10),
      unique: true
    },
    contador: DataTypes.INTEGER
  });

  return FilamentoContadorClasse;
}
