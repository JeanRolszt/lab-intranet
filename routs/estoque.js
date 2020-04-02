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
router.post('/gerenciar/atualizar',(req,res)=>{
    console.log(req.body)
    d = new Date()
    lD = d.toLocaleDateString().split("/")
    sD = [lD[1], lD[0], lD[2]].join("/")

    db.insert("USO", {
        FILAMENTO_ID: req.body.codigo, 
        MASSA: req.body.peso,
        DATA: sD
    })
    
    res.render("estoque/atualizar", {isok: true})
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
    rows = "POLIMERO, SUM(MASSA)"
    cond = "group by POLIMERO"
    mod = ""
    if(req.query!={}){
        if (req.query.label == "cor"){
            rows = "POLIMERO, COR, SUM(MASSA) "
            cond = "group by POLIMERO, COR  order by -SUM(MASSA)" 
        }
        if (req.query.origem != undefined){
            mod =  req.query.origem
        }
    }
    
    db.search(rows, "filamento", (err, rows) => {
        res.send(rows)
    },mod,cond)
})


module.exports = router