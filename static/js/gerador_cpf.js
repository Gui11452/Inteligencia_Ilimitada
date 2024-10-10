(function(){

    function gerarCPF(){
        while(true){
            let cpf = Math.floor(Math.random() * (99999999999 - 10000000000) + 10000000000);
            if (typeof cpf === 'number'){
                cpf = cpf.toString();
            };
        
            if (!(cpf.indexOf('.') === -1 || (cpf.indexOf('-')) === -1)){
                cpf = formataouDesformataCPF(cpf, true, false);
            }
        
            if (cpf.length > 11){
                console.log(`O cpf só pode ter 11 números no máximo!`);
                continue;
            }
            
            let caracteresIguais = cpf + cpf[0];
            if(Number(caracteresIguais) % 11 === 0){
                console.log('O cpf não pode ter todos os números iguais!');
                continue;
            };
        
            const sequencia1 = [10,9,8,7,6,5,4,3,2];
            const sequencia2 = [11,10,9,8,7,6,5,4,3,2];
        
            let soma1 = 0;
            let soma2 = 0;
        
            for (let i in cpf.slice(0,-2)){
                soma1 += cpf[i] * sequencia1[i];
            }
            //console.log(soma1);
            let x1 = 11 - (soma1 % 11)
            if (x1 > 9) x1 = 0;
        
            for (let i in cpf.slice(0,-1)){
                soma2 += cpf[i] * sequencia2[i];
            }
        
            //console.log(soma2);
            let x2 = 11 - (soma2 % 11)
            if (x2 > 9) x2 = 0;
        
            if (x1 == cpf[9] && x2 == cpf[10]){
                cpf = formataouDesformataCPF(cpf);
                return cpf;
                //console.log(`O CPF ${cpf} é válido!`)
            } 
        }
        
    };
    
    function formataouDesformataCPF(cpf, desformata = false, formata = true){
        if (formata) desformata = false;  
        if (!(formata)) desformata = true;   
    
        //console.log(desformata, formata)
    
        const lista = []
        for (let i of cpf){
            lista.push(i);
        };
        if (formata){
            lista.splice(3,0,'.');
            lista.splice(7,0,'.');
            lista.splice(11,0,'-');
        } else if(desformata){
            lista.splice(3,1);
            lista.splice(6,1);
            lista.splice(9,1);
        }
        const cpfFormatado = lista.join('');
        return cpfFormatado;
    };
    
    const resultadoCPF = document.querySelector('.cpf p');
    const resultadoIMG = document.querySelector('.cpf img');
    const resultadoSpan = document.querySelector('.cpf span');

    document.addEventListener('submit', e => {
        e.preventDefault();
        resultadoIMG.style.display = 'inline-block';
        resultadoCPF.innerHTML = gerarCPF();

    })

    document.addEventListener('click', e => {
        const el = e.target;
        if(el == resultadoIMG){
            navigator.clipboard.writeText(resultadoCPF.innerText);
            resultadoSpan.style.display = 'inline-block';
            setTimeout(() => {
                resultadoSpan.style.display = 'none';
            }, 2000);
        }
    })
    
    
    /* validaCPF('70548445052');
    validaCPF('71074401441');
    validaCPF('86602357468');
    validaCPF('86602357463');
    validaCPF('71170942490');
    console.log('/////////////////////////////////////////');
    validaCPF('705.484.450-52');
    validaCPF('710.744.014-41');
    validaCPF('866.023.574-68'); */

})();