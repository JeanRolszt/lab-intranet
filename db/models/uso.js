/*
 * Cada instância dessa classe representa uma medida da massa de um rolo de filamento em um determinado dia
 */

 module.exports = (sequelize, DataTypes) => {
  var HistoricoFilamento = sequelize.define('HistoricoFilamento', {
    massa: DataTypes.INTEGER,
    data: DataTypes.DATE,
    FilamentoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Filamentos',
        key: 'id'
      }
    }
  });

  HistoricoFilamento.associate = (models) => {
    HistoricoFilamento.belongsTo(models.Filamento);
  }

  return HistoricoFilamento;
}
  