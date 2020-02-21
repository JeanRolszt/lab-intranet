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
        this.insert('a', ['b', 'c'])
        db.close();

    }
    update(tablename, col, value, condition){
        var comm  =  `UPDATE ${tablename} SET ${col} = ${value} where ${condition};`
        console.log(comm)
        //db.run(comm)
    }
    
    insert(tableName, data){
        let aux = data.map((val) => '?').join(',');
        var comm = `INSERT INTO ${tableName} VALUES (${aux}) `;
        console.log(comm)
        //db.run(comm, data)
    }

    search(datas, tables, conditions='', modifiers=''){
        var comm = `SELECT ${datas} FROM ${tables}`
        if (conditions.len){
            command = command + " WHERE {0}".format(conditions)
        }
        if (modifiers != ''){
            command = command + " {0}".format(modifiers)
        }
}

}

function a(){
    return 1;
}

module.exports = DbManager