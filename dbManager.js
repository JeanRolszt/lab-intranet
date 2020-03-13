const sqlite3 = require("sqlite3").verbose()
const fs = require('fs')
const DBname = 'estoque.db'

class DbManager{
    constructor() 
    {
        console.log('construtor')
        this.exists = false
        if (fs.existsSync(DBname)) {
            this.exists = true
        }
        this.init()
    }

    init(){
        let db = new sqlite3.Database(DBname, (err) => {
            if (err) {
                return console.error(err.message);
            }
            else{
                console.log('Connected');
            }
            });
        this.db = db
        if (!this.exists){
            console.log('Criando tabelas')
            db.run('CREATE TABLE filamento (   \
                FILAMENTO_ID VARCHAR(10) PRIMARY KEY,  \
                POLIMERO VARCHAR(10),\
                ABERTO BOOLEAN,\
                COR VARCHAR(10),\
                DIAMETRO REAL,\
                RESPONSAVEL CHAR(3),\
                ORIGEM VARCHAR(10),\
                MASSA INTEGER);')

            db.run('CREATE TABLE USO (  \
                FILAMENTO_ID VARCHAR(10),  \
                MASSA INTEGER,\
                DATA DATE,\
                FOREIGN KEY(FILAMENTO_ID) REFERENCES filamento(FILAMENTO_ID));')
        }
        this.update('a','b','c','d');
        //this.insert('a', ['b', 'c'])
        //this.close()
    }

    close(){
        this.db.close();
    }
    update(tablename, col, value, condition){
        var comm  =  `UPDATE ${tablename} SET ${col} = ${value} where ${condition};`
        console.log(comm)
        //this.db.run(comm)
    }
    
    insert(tableName, data){
        var values = Object.values(data)
        let aux = values.map((val) => '?').join(','); 
        var fields = Object.keys(data).join(',')
        var comm = `INSERT INTO ${tableName} (${fields}) VALUES (${aux}) `;
        console.log(comm)
        this.db.run(comm,values)
    }

    search(datas, tables, callback, conditions, modifiers){
        var comm = `SELECT ${datas} FROM ${tables} `
        if (conditions!=undefined && conditions!="" ){
            comm = comm + " WHERE " + conditions
        }
        if (modifiers != undefined){
            comm = comm + modifiers
        }
        var ret 
        console.log(comm)
        this.db.all(comm, callback)        
        
    }

}

function a(){
    return 1;
}

module.exports = DbManager