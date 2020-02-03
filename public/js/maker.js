listaDeReponsaveis()
initDB()
function addMaker(){
    //quantidade de itens
    var nItens = document.getElementsByName("linha")
    nItens = nItens.length
    console.log(nItens)

    //pegando o local da tabela
    var tbody = document.getElementsByTagName("tbody")[0]
    var novoTR = document.createElement("tr")
    novoTR.setAttribute("name","linha")
    novoTR.setAttribute("id","linha"+nItens)
    
    //nome
    var td = document.createElement('td')
    var input = document.createElement('input')
    input.setAttribute('id', 'item'+nItens)
    input.setAttribute('class','form-control form-control-sm')
    input.setAttribute('type','text')
    input.setAttribute('placeholder','Nome do item')
    input.setAttribute('onchange','updateAllMaker()')
    td.appendChild(input)
    novoTR.appendChild(td)
    
    //quantidade
    td = document.createElement('td')
    input = document.createElement('input')
    input.setAttribute('id', 'quantidade'+nItens)
    input.setAttribute('class','form-control form-control-sm')
    input.setAttribute('type','number')
    input.setAttribute('onchange','updateAllMaker()')
    td.appendChild(input)
    novoTR.appendChild(td)

    //material
    var select = document.createElement('select')
    td = document.createElement('td')
    select.setAttribute('id', 'material'+nItens)
    select.setAttribute('class','form-control form-control-sm')
    select.setAttribute('onchange','updateAllMaker()')
    var option=document.createElement("option")
    option.text = 'PLA'
    option.value = 'PLA'
    select.add(option)
    option=document.createElement("option")
    option.text = 'ABS'
    option.value = 'ABS'
    select.add(option)
    td.appendChild(select)
    novoTR.appendChild(td)

    //tempo
    td = document.createElement('td')
    input = document.createElement('input')
    input.setAttribute('id', 'tempo'+nItens)
    input.setAttribute('class','form-control form-control-sm')
    input.setAttribute('type','number')
    input.setAttribute('placeholder','min')
    input.setAttribute('onchange','updateAllMaker()')
    td.appendChild(input)
    novoTR.appendChild(td)

    //massa
    td = document.createElement('td')
    input = document.createElement('input')
    input.setAttribute('id', 'massa'+nItens)
    input.setAttribute('class','form-control form-control-sm')
    input.setAttribute('type','number')
    input.setAttribute('placeholder','gramas')
    input.setAttribute('onchange','updateAllMaker()')
    td.appendChild(input)
    novoTR.appendChild(td)

    //preço por peça
    td=document.createElement('td')
    td.setAttribute('id', 'precoporpeca'+nItens)
    td.innerText = 'R$0.00'
    novoTR.appendChild(td)

    //subtotal
    td=document.createElement('td')
    td.setAttribute('id', 'subtotal'+nItens)
    td.setAttribute('class', 'subtotal')
    td.innerText = 'R$0.00'
    novoTR.appendChild(td)

    //cor
    td = document.createElement('td')
    input = document.createElement('input')
    input.setAttribute('id', 'cor'+nItens)
    input.setAttribute('class','form-control form-control-sm')
    input.setAttribute('type','text')
    input.setAttribute('onchange','updateAllMaker()')
    td.appendChild(input)
    novoTR.appendChild(td)

    //preenchimento
    td = document.createElement('td')
    input = document.createElement('input')
    input.setAttribute('id', 'preenchimento'+nItens)
    input.setAttribute('class','form-control form-control-sm')
    input.setAttribute('type','number')
    input.setAttribute('onchange','updateAllMaker()')
    td.appendChild(input)
    novoTR.appendChild(td)
    
    tbody.appendChild(novoTR)
}

function rmvMaker(){
    var tbody = document.querySelector("tbody");
    if (tbody.lastChild.id != 'linha0') tbody.removeChild(tbody.lastChild);
}

function updateMaker(index){
    //preços para editar
    var precoDoMaterial,precoDoTempoDeImpressao,fatorDeCorreção

    precoDoTempoDeImpressao = 0.042
    fatorDeCorreção = 1.15

    var element = document.getElementById('material'+index);
    var checkMaterial = document.getElementById('donoMaterial')
    if(checkMaterial.checked)precoDoMaterial=0;
    else if(element.value=='PLA')precoDoMaterial=0.14;
    else if(element.value=='ABS')precoDoMaterial=0.09;
    else if(element.value=='FLEX')precoDoMaterial=0.16;
    else if(element.value=='PETG')precoDoMaterial=0.16;

    //variaveis que recebemos dos inputs
    var quantidade,tempo,massa
    quantidade=document.getElementById('quantidade'+index).value
    tempo=document.getElementById('tempo'+index).value
    massa=document.getElementById('massa'+index).value

    var precoporpeca=(tempo*precoDoTempoDeImpressao*1.15)+(massa*precoDoMaterial);
    document.getElementById('precoporpeca'+index).innerText='R$'+(Math.round(precoporpeca * 100) / 100).toFixed(2);

    var subtotal=precoporpeca*quantidade
    document.getElementById('subtotal'+index).innerText='R$'+(Math.round(subtotal * 100) / 100).toFixed(2);

}

function updateAllMaker(){
    var nItens = document.getElementsByName("linha")
    nItens = nItens.length

    for(var i=0;i<nItens;i++){
        updateMaker(i);
    }

    var element = document.getElementsByClassName('subtotal')
    var somaSubtotal=0
    for(var i=0;i<element.length;i++){
        somaSubtotal += parseFloat(element[i].innerText.replace("R$", ""))
    }

    var tmpconsulta=document.getElementById('tmpconsulta').value
    //editar para pegar por bando de dados.
    var precoDoTempoDeConsulta = 0.25
    var imposto = 30
    var multiplicadorImposto = (100-imposto)/100

    var precotmpconsulta= tmpconsulta*precoDoTempoDeConsulta;
    var total = (somaSubtotal+precotmpconsulta)/multiplicadorImposto
    
    document.getElementById('total').innerText="R$"+(Math.round(total * 100) / 100).toFixed(2);

    
}

function listaDeReponsaveis(){
    var integrantes = ['Jean Rolszt',"Nikson Ferreira",'Alexandre']
    var select = document.getElementById('listarespeonsaveis')
    var option;
    for (var i=0;i<integrantes.length;i++){
        option=document.createElement("option")
        option.text = integrantes[i]
        option.value = integrantes[i]
        select.add(option)
    }
}

function initDB(){
    let db = new sqlite3.Datebase("db.db", (err) => {
        if (err){
            return console.error(err.message);
        }
        console.log('connected');
    });
    db.close()
}