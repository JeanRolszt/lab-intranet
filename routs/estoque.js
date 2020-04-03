const express = require("express")
const router = express.Router()

// 
// SELECT filamento.FILAMENTO_ID, (SELECT MASSA FROM USO WHERE USO.FILAMENTO_ID=filamento.FILAMENTO_ID ORDER BY (julianday('now')-julianday(DATA)) ASC LIMIT 1) as massaatual FROM filamento WHERE filamento.FILAMENTO_ID = 'BA16';
// SELECT filamento.FILAMENTO_ID, (SELECT MASSA FROM USO WHERE USO.FILAMENTO_ID=filamento.FILAMENTO_ID AND julianday(DATA) < julianday('2019-11-18') ORDER BY (julianday('now')-julianday(DATA)) ASC LIMIT 1) as massaant FROM filamento WHERE filamento.FILAMENTO_ID = 'BA16';
// SELECT *, (SELECT massa FROM HistoricoFilamentos as sub WHERE sub.FilamentoId=main.FilamentoId AND julianday(sub.DATA) < julianday(main.data) ORDER BY sub.data DESC LIMIT 1) - main.massa as massa_consumida FROM HistoricoFilamentos as main ORDER BY main.DATA DESC;
// SELECT id, massa, data, SUM(massa) OVER ( ORDER BY data ASC, id ASC ) as cum FROM HistoricoFilamentos ORDER BY id;
//

router.get('/',(req,res)=>{
    console.log(req.query);
    if(req.query["status"] == "0") message = "Massa atualizada";
    else if((req.query["status"] == "1")) message = "Falha ao atualizar a massa";
    else message = undefined;
    db.Filamento.findAll().then(filamentos => {
        res.render("estoque/", {data: filamentos.map(x => x.dataValues), message: message})
    }).catch(err => {
        res.render("estoque/", {data: [], message: message})
    })
    
})
router.get('/gerenciar',(req,res)=>{
    res.render("estoque/gerenciar")
})
router.get('/gerenciar/atualizar',(req,res)=>{
    res.render("estoque/atualizar")
})
router.post('/gerenciar/atualizar', (req,res) => {
    db.Filamento.findOne({attributes: ['id', 'massa'], where: {codigo: req.body.codigo}}).then(filamento => {
        novamassa = parseInt(req.body.peso);
        consumo = filamento.massa - novamassa;

        db.ConsumoFilamento.create({
            massa: consumo,
            data: new Date(),
            FilamentoId: filamento.id, 
        })

        filamento.setDataValue("massa", novamassa);
        filamento.save();
        res.redirect("../?status=0");
        //res.render("estoque/", {message: "Histórico atualizado para o rolo " + req.body.codigo})
    }).catch(err => {
        res.redirect("../?status=1");
        //res.render("estoque/", {message: "Falha ao atualizar histórico, talvez o código esteja errado."})
    })
    
})
router.get('/gerenciar/adicionar',(req,res)=>{
    res.render("estoque/adicionar")
})
router.get('/gerenciar/cadrastar',(req,res)=>{
    res.render("estoque/cadrastar")
})
router.post('/gerenciar/cadrastar',(req,res)=>{
    res.render("estoque/cadrastar", {isok: true})
})

router.get('/gerenciar/getData', (req, res) => {
    if(req.query["funcao"] == "consumo"){
        dataInicial = req.query["dataInicial"];
        dataFinal = req.query["dataFinal"];
        db.ConsumoFilamento.obterConsumoAcumulado(dataInicial, dataFinal).then(data => res.send(data[0]));
    }
    else if(req.query["funcao"] == "massa"){
        db.ConsumoFilamento.obterHistoricoMassa().then(data => res.send(data[0]));
    }
})

router.get('/gerenciar/plotData', (req,res)=>{
    attributes = [
        'polimero', 
        [db.sequelize.fn('SUM', db.sequelize.col('massa')), 'massa']
    ];
    group = ['polimero']
    order = []
    where = {}
    
    if(req.query!={}){
        if (req.query.label == "cor"){
            attributes.push('cor')
            order = [db.sequelize.fn('-SUM', db.sequelize.col('massa'))]
        }
        if (req.query.origem != undefined){
            where = {responsavel: req.query.origem}
        }
    }

    db.Filamento.findAll({
        attributes: attributes, 
        where: where,
        group: group,
        order: order
    }).then(filamentos => res.send(filamentos));

    // db.search(rows, "filamento", (err, rows) => {
    //     res.send(rows)
    // },mod,cond)


    //res.send({})
})


module.exports = router