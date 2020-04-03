const express = require("express")
const router = express.Router()

// 
// SELECT filamento.FILAMENTO_ID, (SELECT MASSA FROM USO WHERE USO.FILAMENTO_ID=filamento.FILAMENTO_ID ORDER BY (julianday('now')-julianday(DATA)) ASC LIMIT 1) as massaatual FROM filamento WHERE filamento.FILAMENTO_ID = 'BA16';
// SELECT filamento.FILAMENTO_ID, (SELECT MASSA FROM USO WHERE USO.FILAMENTO_ID=filamento.FILAMENTO_ID AND julianday(DATA) < julianday('2019-11-18') ORDER BY (julianday('now')-julianday(DATA)) ASC LIMIT 1) as massaant FROM filamento WHERE filamento.FILAMENTO_ID = 'BA16';
//

router.get('/',(req,res)=>{
    res.render("estoque/gerenciar")
})
router.get('/gerenciar',(req,res)=>{
    res.render("estoque/gerenciar")
})
router.get('/gerenciar/atualizar',(req,res)=>{
    res.render("estoque/atualizar")
    console.log(req.query)
})
router.post('/gerenciar/atualizar', (req,res) => {
    console.log(req.body)
    db.Filamento.findOne({attributes: ['id'], where: {codigo: req.body.codigo}}).then(filamento => {
        console.log(filamento.id);
        db.HistoricoFilamento.create({
            massa: parseInt(req.body.peso),
            data: new Date(),
            FilamentoId: filamento.id, 
        })
        res.render("estoque/atualizar", {message: "Histórico atualizado para o rolo " + req.body.codigo})
    }).catch(err => {
        res.render("estoque/atualizar", {message: "Falha ao atualizar histórico, talvez o código esteja errado."})
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
    console.log(req.body)
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