const express = require("express")
const router = express.Router()

router.get('/',(req,res)=>{
    res.render("estoque/estoque")
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

router.get('/gerenciar/plotData', (req,res)=>{
    rows = "POLIMERO, SUM(MASSA)"
    cond = "group by POLIMERO"
    mod = ""
    if (req.query != {} && req.query.label == "cor"){
        rows = "POLIMERO, COR, SUM(MASSA) "
        cond = "group by POLIMERO, COR  order by -SUM(MASSA)" 
    }
    if (req.query != {} && req.query.origem != undefined){
        mod =  req.query.origem
    }
    db.search(rows, "filamento", (err, rows) => {
        console.log(rows)
        res.send(rows)
    },mod,cond)
})


module.exports = router