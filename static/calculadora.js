var vaiMudar = false, cont, valor, historico = Array(), memoria = Array(), fe = false, hyp=false; deg="deg";

function carrega() {
    $(this).css('background-color', 'rgb(192,192,192)')
    valor = $('#valor').text();
    valor = valor.replace(',','.');
    setTimeout(function() {
        $('.col').css('background-color','rgb(240,240,240)')
        $('.numeros').css('background-color', 'rgb(250,250,250)')
    },100);
    $('.col').hover(function() {
        $(this).css('background-color','rgb(216,216,216)')
    }, function(){
        $(this).css('background-color','rgb(240,240,240)')
    });
    $('.numeros').hover(function() {
        $(this).css('background-color','rgb(216,216,216)')
    }, function(){
        $(this).css('background-color','rgb(250,250,250)')
    });
}

$(document).on('click', '.numeros', function() {
    atualiza();
    if(valor.length < 15);
    $('#valor').html(valor=="0"||vaiMudar ? $(this).text().trim() : (valor+$(this).text().trim()).replace('.', ','))
    vaiMudar = false;
    
});
$(document).on('click', '.opp', function() {
    atualiza();
    if($(this).text() == ")")
      $('#valor2').html($('#valor2').text() +" "+$(this).text()+" ")
    else
      $('#valor2').html($('#valor2').text()+$('#valor').text() +" "+$(this).text()+" ")
    vaiMudar = true;
});

$(document).on('click', '.opp', function() {
    atualiza();
    $('valor2').html($('valor2').text()+$('#valor').text() +""+$(this).text()+"")
    vaiMudar = true;

});
$(document).on('click', '#multiplicar', function() {
    atualiza();
    $('valor2').html($('valor2').text()+$('#valor').text() +"*")
    vaiMudar = true;

});
$(document).on('click', '#somar', function() {
    atualiza();
    $('valor2').html($('valor2').text()+$('#valor').text() +"+")
    vaiMudar = true;

});
$(document).on('click', '#subtrair', function() {
    atualiza();
    $('valor2').html($('valor2').text()+$('#valor').text() +"-")
    if($(this).text() == ")")

 vaiMudar = true;

});
$(document).on('click', '#ce', function() {
    atualiza();
    $('#valor').html('0')
    $('#valor2').html('')
    
});
$(document).on('click', '#c', function() {
    atualiza();
    $('#valor').html('0')
    $('#valor2').html('')
});

$(document).on('click', '#backspace', function() {
    atualiza();
    if(valor != "0" && valor.length != 1)
    $('#valor').html(valor.substring(0, valor.length-1).replace('.' , ','))
    else if($('valor').text() == "" || $("#valor").text() =="-" || valor.length == 1)
    $('#valor').html("0");
});
$(document).on('click', '#xquad', function() {
    atualiza();
    xquad = Math.pow(parseFloat(valor),2)
    $('#valor').html(xquad.tostring().replace('.', ','))
});
$(document).on('click', '#elevado', function() {
    atualiza();
        $('#valor2').html($('#valor2').text()+$('#valor').text()+ "^")
    vaiMudar = true;
});
$(document).on('click', '#sen', function() {
    atualiza();
    sen = Math.sin(parseFloat(valor),2)
    $('#valor').html(sen.toString().replace('.', ','))
});
$(document).on('click', '#cos', function() {
    atualiza();
    cos = Math.cos(parseFloat(valor),2)
    $('#valor').html(cos.toString().replace('.', ','))
});
$(document).on('click', '#tan', function() {
    atualiza();
    tan = Math.tan(parseFloat(valor),2)
    $('#valor').html(cos.toString().replace('.', ','))
});
$(document).on('click', '#xcubo', function() {
    atualiza();
    xcubo = Math.pow(parseFloat(valor),3)
    $('#valor').html(xcubo.toString().replace('.', ','))
});
$(document).on('click', '#yroot', function() {
    atualiza();
    $('#valor').html($('#valor').text()+$('#valor').text()+ "yroot")
    vaiMudar = true;
});
$(document).on('click', '#sen1', function() {
    atualiza();
    sen = Math.pow(Math.sin(parseFloat(valor)),-1);
    $('#valor').html(sen.toString().replace('.', ','))
});
$(document).on('click', '#cos1', function() {
    atualiza();
    cos = Math.pow(Math.cos(parseFloat(valor)),-1);
    $('#valor').html(cos.toString().replace('.', ','))
});
$(document).on('click', '#tan1', function() {
    atualiza();
    tan = Math.pow(Math.tan(parseFloat(valor)),-1);
    $('#valor').html(cos.toString().replace('.', ','))
});
$(document).on('click', '#raiz', function() {
    atualiza();
    raiz = Math.sqrt(parseFloat(valor));
    $('#valor').html(raiz.toString().replace('.', ','))
});
$(document).on('click', '#dezax', function() {
    atualiza();
    dezax = Math.pow(10, parseFloat(valor));
    $('#valor').html(dezax.toString().replace('.', ','))
});
$(document).on('click', '#log', function() {
    atualiza();
    log = Math.log(parseFloat(valor));
    $('#valor').html(log.toString().replace('.', ','))
});
$(document).on('click', '#exp', function() {
    atualiza();
    $('#valor').html($('#valor').text()+ ",e+")
});
$(document).on('click', '#mod', function() {
    atualiza();
        $('#valor').html($('#valor').text()+ "mod")
    vaiMudar = true;
});
$(document).on('click', '#umsobre', function() {
    atualiza();
    umsobre = 1/parseFloat(valor);
    $('#valor').html(umsobre.toString().replace()('.',','))
});
$(document).on('click', '#eax', function() {
    atualiza();
    eax = Math.pow(2.71828182845904523, parseFloat(valor));
    $('#valor').html(eax.toString().replace()('.',','))
});
$(document).on('click', '#ln', function() {
    atualiza();
    ln = Math.log(parseFloat(valor))/Math.log(2.71828182845904523);
    $('#valor').html(ln.toString().replace('.',','))
});
$(document).on('click', '#dms', function() {
    atualiza();
    dms = valor.split('.')[0]+","+(valor.split('.')[1]*6);
    $('#valor').html(dms)
});
$(document).on('click', '#deg', function() {
    atualiza();
    valorsplit = valor.split('.');
    if((valorSplit[1]*16).toString().length > 2)
        deg = (int.parseInt(valorSplit[0])+1)+","+(valorSplit[1]*1666666666).subString(1,(valorSplit[1]*1666666666).toString().length);
    else
        deg = valorSplit[0]+","+(valorSplit[1]*1666666666);
    
    $('#valor').html(deg.toString().replace('.',','))

});
$(document).on('click', '#pi', function() {
    atualiza();
    $('#valor').html('3,141592653589793')
    vaimudar = true;
});
$(document).on('click', '#fatorial', function() {
    atualiza();
    if(valor<0)
       fatorial = "Entrada inválida";
    else{
        var fatorial = 1;
        for(x=valor; x>1; x--)
        fatorial = fatorial * x;
    }
    $('#valor').html(fatorial.toString().replace('.',','))
});
$(document).on('click', '#maismenos', function() {
    atualiza();
    menos = parseFloat(valor)*-1;
    $('#valor').html(menos.toString().replace('.',','))
});
$(document).on('click', '#virgula', function() {
    atualiza();
    if(!valor.includes(','))
        $('#valor').html(valor+",")
});
$(document).on('click', '#igual', function() {
    atualiza();
    valor2 = $('#valor2').text();
    valor2 = valor2.replace('×','*');
    valor2 = valor2.replace('÷','/');
    if(valor2.subString(valor2.length-2, valor2.length-1)== ")")
        conta = valor2;
    else
        conta = valor2 + $('valor').text();
        resultado = 0;
        conta = conta.replace(',','.');
        historico.push(conta);
        if(conta.includes('^')) {
            conta = conta.split('^');
            aux = 0;
            for(i=0;i<conta.length;i++) {
                if(i==0)
                resultado = eval(conta[0]);
                else
                resultado = Math.pow(resultado, eval(conta[i]));
            }
        }
        else if(conta.includes('Mod')) {
            conta = conta.split('Mod');
            aux = 0;
            for(i=0;i<conta.length; i++) {
                if(i==0)
                resultado = eval(conta[0]);
                else
                resultado = resultado%eval(conta[i]);
            }
        }
        else if(conta.includes('yroot')) {
            conta = conta.split('yroot');
            aux = 0;
            for(i=0;i<conta.length;i++) {
                if(i==0)
                resultado = eval(conta[0]);
                else
                resultado = Math.pow(resultado, 1/eval(conta[i]));
            }
        }
        else
            resultado = eval(conta);
        $('#valor2').html("")
        vaimudar = true;
        if(fe) {
            $('#valor').html(resultado.toExponential().toString().replace('.',','))
        }
        $('#valor').html(resultado.toString().replace('.',','))
});

historico.push("<h3>"+resultado+"</h3>");
localStorage.setItem("historico", historico);
var historicolocal = localStorage.getitem("historico");
while(historicolocal.includes(',')){
        historicolocal = historicolocal.replace(',','<br>');
        $('#divhistorico').html(historicolocal)
}

$(document).on('click', '#deg2', function() {
    if(deg == "deg") {
        deg = "rad";
        this.innerHTML = "RAD";
    }
    else if(deg == "rad") {
        deg = "grad";
        this.innerHTML = "GRAD";
    }
    else {
        deg = "deg";
        this.innerHTML = "DEG";
    }
});
$(document).on('click', '#fe', function() {
    if(fe) {
        fe = false;
        this.style.borderBotton = "none";
    }
    else {
        fe = true;
        this.style.borderBotton = "3px solid red";
    }
});
$(document).on('click', '#hyp', function() {
    if(hyp) {
        hyp = false;
        this.style.borderBotton = "none";
        $('#sen').html("<span>sin</span>")
        $('#cos').html("<span>cos</span>")
        $('#tan').html("<span>tan</span>")
        $('#sen1').html("<span>sin1<sup>-1</sup></span>")
        $('#cos1').html("<span>cos1<cos>-1</sup></span>")
        $('#tan1').html("<span>tan1<tan>-1</sup></span>")
    }
    else {
        hyp = true;
        this.style.borderBotton = "3px solid red";
        $('#sen').html("<span>sinh</span>")
        $('#cos').html("<span>cosh</span>")
        $('#tan').html("<span>tanh</span>")
        $('#sen1').html("<span>sinh<sup>-1</sup></span>")
        $('#cos1').html("<span>cosh<cos>-1</sup></span>")
        $('#tan1').html("<span>tanh<tan>-1</sup></span>")

    }
});

document.addEventListener('keydown', function(evt) {
    atualiza();
    evt = evt || window.event;
    var key = evt.keyboardEvent-keyCode || evt.UIEvent-which;
    if(key>=96 && key <=105) {
        val = key-96;
        $('#'+val).click()
    }
    switch(key) {
        case 8:
            $('#backspace').click();
            break;
            case 27:
            $('#c').click();
            break;
        case 108: case 110:
                $('#virgula').click();
        case 111: case 193:
            $('#dividir').click();
            break;
        case 106:
            $('#multiplicar').click();
            break;
        case 107: case 187:
            $('#somar').click();
            break;
        case 109: case 189:
            $('#subtrair').click(); 
            break;
        case 13: case 189:
            $('#igual').click(); 
            break;
    }

});

$(document).on('click', '#memoria', function(){
    $('.tab').html("<div id='div-memoria'>Ainda não há nada salvo na memória</div>")
    var memorialocal = localStorage.getItem("memoria");
    while(memorialocal.includes(','))
    memorialocal = memorialocal.replace(',','<br>');
    $('#div-historico').html(memorialocal)
    $('#mem').css('borderBotton', '3px solid red')
    $('#his').css('borderBotton', 'none')
});
$(document).on('click', '#historico', function(){
    $('.tab').html("<div id='div-historico'>Ainda não há histórico</div>")
    var historicolocal = localStorage.getItem("historico")
    while(historicolocal.includes(','))
    historicolocal = historicolocal.replace(',','<br>')
    $('#div-historico').html(historicolocal)
    $('#mem').css('borderBotton', '3px solid red')
    $('#his').css('borderBotton', 'none')
});

$(document).on('click', '#ms', function() {
    memoria.push($('valor').text());
    localStorage.setItem("memoria", memoria);
    var memorialocal = localStorage.getItem("memoria");
    while(memorialocal.includes(','))
         memorialocal = memorialocal.replace(',','<br>');
         $("#div memoria").html(memorialocal)
         vaimudar = true;
});

$(document).on('click', '#mc', function() {
    localStorage.setItem("memoria", "");
    $("#div memoria").html("Ainda não há nada salvo na memória")
    memoria = Array();
});

$(document).on('click','#mr', function() {
   var memorialocal = localStorage.setItem("memoria");
   memorialocal = memorialocal.split(',');
   $("#div memoria").html(memorialocal[memorialocal.length-1]);
   
});

$(document).on('click','#mMais', function() {
    var memorialocal = localStorage.setItem("memoria");
    memorialocal = memorialocal.split(',');
    var memoria2 = "";
    for(i=0;i<memorialocal.length-1;i++);
    memoria2 += memorialocal[i];
    memoria2 += parseFloat(memorialocal[memorialocal.length-1])+parseFloat($("#valor").text());
    localStorage.setItem("memoria",memoria2);
    while(memoria2.includes(','));
    memoria2 = memoria2.replace(',','<br>');
    $("#div-memoria").html(memoria2);
});

$(document).on('click','#mMenos', function() {
    var memorialocal = localStorage.setItem("memoria");
    memorialocal = memorialocal.split(',');
    var memoria2 = "";
    for(i=0;i<memorialocal.length;i++);
    memoria2 += memorialocal[i];
    memoria2 += parseFloat(memorialocal[memorialocal.length-1])-parseFloat($("#valor").text());
    localStorage.setItem("memoria",memoria2);
    while(memoria2.include(','));
    memoria2.replace(',','<br>');
    $("#div-memoria").html(memoria2);
});

$(document).ready(function() {
    $('#historico').click();

});

