const express = require("express")
const router = express.Router()
const bodyParser = require('body-parser')


router.get('/',(req,res)=>{
    res.render("orcamentos/orcamentos")
})

router.get('/maker',(req,res)=>{
    res.render("orcamentos/maker")
})
router.post('/maker',(req,res)=>{
    res.end(JSON.stringify(req.body))
})

router.get('/fdm-ext',(req,res)=>{
    res.render("orcamentos/fdm-ext")
})

router.get('/fdm-int',(req,res)=>{
    res.render("orcamentos/fdm-int")
})

router.get('/cnc',(req,res)=>{
    res.render("orcamentos/cnc")
})

router.get('/scanner',(req,res)=>{
    res.render("orcamentos/scanner")
})

router.get('/stratasys',(req,res)=>{
    res.render("orcamentos/stratasys")
})

module.exports = router