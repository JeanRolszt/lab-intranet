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
})
router.get('/gerenciar/adicionar',(req,res)=>{
    res.render("estoque/adicionar")
})


module.exports = router