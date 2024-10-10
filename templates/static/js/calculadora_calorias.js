(function(){

    const idadeInput = document.querySelector('#idade');
    const alturaInput = document.querySelector('#altura');
    const pesoAtualInput = document.querySelector('#peso-atual');
    const pesoDesejadoInput = document.querySelector('#peso-desejado');
    const sexoSelect = document.querySelector('#sexo');
    const atividadeSelect = document.querySelector('#atividade');

    const sexoErrorsSpan = document.querySelector('.sexo-errors');
    const ativiadeErrorsSpan = document.querySelector('.atividade-errors');

    sexoErrorsSpan.style.display = 'none';
    ativiadeErrorsSpan.style.display = 'none';
    sexoErrorsSpan.innerHTML = '';
    ativiadeErrorsSpan.innerHTML = '';

    const caloriasDiariasP = document.querySelector('.calorias-diarias p:nth-of-type(2)');
    const gordurasP = document.querySelector('.gorduras p:nth-of-type(2)');
    const proteinasP = document.querySelector('.proteinas p:nth-of-type(2)');
    const carboidratosP = document.querySelector('.carboidratos p:nth-of-type(2)');
    const consumoDiarioAguaP = document.querySelector('.consumo-diario-agua p:nth-of-type(2)');

    
    document.addEventListener('submit', e => {
        e.preventDefault();

        sexoErrorsSpan.style.display = 'none';
        ativiadeErrorsSpan.style.display = 'none';
        sexoErrorsSpan.innerHTML = '';
        ativiadeErrorsSpan.innerHTML = '';

        let validador = true;

        if(sexoSelect.value == 'Sexo'){
            sexoErrorsSpan.innerHTML = 'O campo acima NÃO pode ficar vazio!';
            sexoErrorsSpan.setAttribute('style', 'margin: 1rem 0');
            validador = false;
        }

        if(atividadeSelect.value == 'Qual o seu nível de atividade diária?'){
            ativiadeErrorsSpan.innerHTML = 'O campo acima NÃO pode ficar vazio!';
            ativiadeErrorsSpan.setAttribute('style', 'margin: 1rem 0');
            validador = false;
        }

        if(validador){
            let idade = parseFloat(idadeInput.value);
            let altura = parseFloat(alturaInput.value);
            let pesoAtual = parseFloat(pesoAtualInput.value);
            let pesoDesejado = parseFloat(pesoDesejadoInput.value);
            let sexo = sexoSelect.value;
            let atividade = atividadeSelect.value;

            const imc = pesoAtual / ((altura / 100) ** 2);

            if(sexoSelect.value == 'Homem'){
                sexo = sexoSelect.value;
                var tmb = 88.362 + (13.397 * pesoAtual) + (4.799 * (altura)) - (5.677 * idade);

            } else if(sexoSelect.value == 'Mulher'){
                sexo = sexoSelect.value;
                var tmb = 447.593 + (9.247 * pesoAtual) + (3.098 * (altura)) - (4.330 * idade);

            }

            if(atividade == 'Sem atividade'){
                var naf = tmb * 1.2;
            } else if(atividade == 'Atividade mínima'){
                var naf = tmb * 1.375;
            } else if(atividade == 'Atividade moderada'){
                var naf = tmb * 1.55;
            } else if(atividade == 'Muito ativo'){
                var naf = tmb *  1.725;
            } else if(atividade == 'Extremadamente ativo'){
                var naf = tmb * 1.9;
            }

            naf -= 300;

            let gorduras = 0.25 * naf / 9;
            let proteinas = 0.15 * naf / 4;
            let carboidratos = (naf - (0.25 * naf + 0.15 * naf)) / 4;

            const consumoAguaML = 35 * pesoAtual;


            caloriasDiariasP.innerHTML = naf.toFixed(2);
            gordurasP.innerHTML = gorduras.toFixed(2);
            proteinasP.innerHTML = proteinas.toFixed(2);
            carboidratosP.innerHTML = carboidratos.toFixed(2);
            consumoDiarioAguaP.innerHTML = consumoAguaML.toFixed(2);



        } 
    
    });

})();