exports.gerarpdfmaker = (info)=>{
    global.window = {document: {createElementNS: () => {return {}} }};
    global.navigator = {};
    global.btoa = () => {};

    const fs = require('fs')
    const jsPDF = require('jspdf/dist/jspdf.node.min')
    var idPDF = 'L2002003MAK';

    // Default export is a4 paper, portrait, using milimeters for units
    var doc = new jsPDF()

    doc.text(info, 10, 10)

    fs.writeFileSync(`./public/pdfs/${idPDF}.pdf`, doc.output())
    // doc.save('a4.pdf')
    return idPDF;

    delete global.window;
    delete global.navigator;
    delete global.btoa;
}