/*
 * Cada instância dessa classe representa uma medida da massa de um rolo de filamento em um determinado dia
 */

 module.exports = (sequelize, DataTypes) => {
  var ConsumoFilamento = sequelize.define('ConsumoFilamento', {
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

  ConsumoFilamento.associate = (models) => {
    ConsumoFilamento.belongsTo(models.Filamento);
  }

  ConsumoFilamento.obterHistoricoMassa = function(){
    query = "SELECT data, SUM(day_sum) OVER ( ORDER BY data ASC ) as cum FROM (SELECT DATE(data) as data, SUM(massa) as day_sum FROM ConsumoFilamentos GROUP BY DATE(data)) ORDER BY data;";
    return sequelize.query(query);
  }

  ConsumoFilamento.obterConsumoAcumulado = function(dataInicial, dataFinal){
    dataInicial = new Date(dataInicial).toISOString().split('T')[0];
    dataFinal = new Date(dataFinal).toISOString().split('T')[0];
    query = "SELECT data, SUM(massa) OVER ( ORDER BY data ASC, id ASC ) as cum FROM ConsumoFilamentos WHERE julianday(ConsumoFilamentos.data) >= julianday('" + dataInicial + "') AND julianday(ConsumoFilamentos.data) <= julianday('" + dataFinal + "') ORDER BY id;";
    console.log(query);
    return sequelize.query(query);
  }

  return ConsumoFilamento;
}
  