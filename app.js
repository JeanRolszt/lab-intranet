//CARREGANDO MODULOS
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const orcamentos = require("./routs/orcamentos.js")
    const settings = require("./routs/settings")
    const path = require("path")
    const sqlite3 = require("sqlite3").verbose()
    const DbManager = require("./dbManager.js")
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
    app.get('/',(req,res)=>{
        res.render("inicio/index")
    })


//OUTROS
const PORT = 8081
app.listen(PORT,()=>{
  console.log("Servidor rodando")
})

//dbManager.a()
db = new DbManager();
//db.initDB()
// let db = new sqlite3.Database('test.db', (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Connected to the in-memory SQlite database.');
//   });
   
//   // db.run('CREATE TABLE filamento(id varchar(10) primary key, polimero varchar(3))');
//   // close the database connection
//   db.close((err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Close the database connection.');
//   });