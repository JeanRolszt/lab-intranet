exports.gerarpdfmaker = (info)=>{
    global.window = {document: {createElementNS: () => {return {}} }};
    global.navigator = {};
    global.btoa = () => {};

    const fs = require('fs')
    const jsPDF = require('jspdf/dist/jspdf.node.min')



    var data = new Date();

    var mes = (data.getMonth() + 1).toString();
    var ano = (data.getFullYear()).toString();
    var id = fs.readdirSync('./public/pdfs').length+1;
    console.log(id)
    id = id.toString();
    
    if(id.length==1)id='00'+id;
    else if(id.length==2)id='0'+id;
    
    if(mes.length==1) mes = '0'+mes;
    var idPDF = `L${ano[2]}${ano[3]}${mes}${id}MAK`;

    // Default export is a4 paper, portrait, using milimeters for units
    var doc = new jsPDF()

    var totalItens=0;
    for(var i=0;info['item'+i];i++){
        totalItens++;
    }
    //console.log(totalItens)

    
    doc.text(info.nome, 10, 10)

    fs.writeFileSync(`./public/pdfs/${idPDF}.pdf`, doc.output())

    return idPDF;

    delete global.window;
    delete global.navigator;
    delete global.btoa;
}