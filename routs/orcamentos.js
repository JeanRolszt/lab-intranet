const express = require("express")
const router = express.Router()
const bodyParser = require('body-parser')
const makerPDF = require('../aquivosOrcamentos/geradores/makerpdf')
const fs = require('fs')


router.get('/',(req,res)=>{
    res.render("orcamentos/orcamentos")
})

router.get('/maker',(req,res)=>{
    res.render("orcamentos/maker")
})
router.post('/maker',(req,res)=>{
    // idPDF = makerPDF.gerarpdfmaker(JSON.stringify(req.body))
    idPDF = makerPDF.gerarpdfmaker(req.body)
    // var file = fs.createReadStream(`/public/pdfs/${idPDF}.pdf`);
    // file.pipe(res);
    // res.download(__dirname + `/public/pdfs/${idPDF}.pdf`,`${idPDF}.pdf`)
    // res.end(JSON.stringify(req.body))
    var file = fs.createReadStream(`./public/pdfs/${idPDF}.pdf`);
    var stat = fs.statSync(`./public/pdfs/${idPDF}.pdf`);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${idPDF}.pdf`);
    file.pipe(res);
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