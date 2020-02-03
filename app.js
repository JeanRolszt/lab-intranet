//CARREGANDO MODULOS
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const orcamentos = require("./routs/orcamentos.js")
    const settings = require("./routs/settings")
    const teste = require("./routs/teste")
    const estoque = require("./routs/estoque")
    const path = require("path")
    const sqlite3 = require("sqlite3")
    //const mongoose = require('mongoose')

//CONFIGURAÇÕES
    //BODYPARESER
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //HANDLEBARS
    app.engine('handlebars',handlebars({defaultLayout: 'main'}))
    app.set('view engine','handlebars')

    //MONGOOSE

    //PUBLIC
    app.use(express.static(path.join(__dirname, 'public')));

//ROTAS
    app.use("/orcamentos",orcamentos)
    app.use("/settings",settings)
    app.use("/teste",teste)
    app.use("/estoque",estoque)
    app.get('/',(req,res)=>{
        res.render("inicio/index")
    })


//OUTROS
const PORT = 8081
app.listen(PORT,()=>{
    console.log("Servidor rodando")
})