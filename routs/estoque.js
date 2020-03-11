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
    db.insert("USO", {
        FILAMENTO_ID: req.body.codigo, 
        MASSA: req.body.peso
    })
    
    res.render("estoque/atualizar", {isok: true})
})
router.get('/gerenciar/adicionar',(req,res)=>{
    res.render("estoque/adicionar")
})

router.get('/gerenciar/plotData',(req,res)=>{
    db.search("*", "USO", (err, rows) => {
        console.log(rows)
        res.send(rows)
    })
})


module.exports = router