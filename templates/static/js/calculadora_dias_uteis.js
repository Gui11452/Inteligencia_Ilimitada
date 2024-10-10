(function(){

    function calcularPascoa(ano) {
        const f = Math.floor;
        const G = ano % 19;
        const C = f(ano / 100);
        const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
        const I = H - f(H / 28) * (1 - f(H / 28) * f(29 / (H + 1)) * f((21 - G) / 11));
        const J = (ano + f(ano / 4) + I + 2 - C + f(C / 4)) % 7;
        const L = I - J;
        const mes = 3 + f((L + 40) / 44);
        const dia = L + 28 - 31 * f(mes / 4);
    
        return new Date(ano, mes - 1, dia);
    }
    
    function calcularCarnaval(pascoa) {
        const carnaval = new Date(pascoa);
        carnaval.setDate(pascoa.getDate() - 47);
        return carnaval;
    }
    
    function calcularCorpusChristi(pascoa) {
        const corpusChristi = new Date(pascoa);
        corpusChristi.setDate(pascoa.getDate() + 60);
        return corpusChristi;
    }
    
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const pascoa = calcularPascoa(ano);
    const carnaval = calcularCarnaval(pascoa);
    const corpusChristi = calcularCorpusChristi(pascoa);
    
    //console.log(`Páscoa em ${ano}: ${pascoa.toLocaleDateString()}`);
    //console.log(`Carnaval em ${ano}: ${carnaval.toLocaleDateString()}`);
    //console.log(`Corpus Christi em ${ano}: ${corpusChristi.toLocaleDateString()}`);

    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];
    const feriadosNacionais = {
        "Janeiro": {
            "1": "Confraternização Universal"
        },
        "Fevereiro": {
            // Carnaval é uma data móvel, cai 47 dias antes da Páscoa
            // Exemplo: "21": "Carnaval (data móvel)"
        },
        "Março": {
            // Carnaval pode cair em fevereiro ou março
            // Exemplo: "05": "Carnaval (data móvel)"
        },
        "Abril": {
            "21": "Tiradentes",
            // Sexta-Feira Santa é uma data móvel, a sexta-feira antes da Páscoa
            // Exemplo: "19": "Sexta-Feira Santa (data móvel)"
        },
        "Maio": {
            "1": "Dia do Trabalhador"
        },
        "Junho": {
            // Corpus Christi é uma data móvel, 60 dias após a Páscoa
            // Exemplo: "20": "Corpus Christi (data móvel)"
        },
        "Julho": {},
        "Agosto": {},
        "Setembro": {
            "07": "Independência do Brasil"
        },
        "Outubro": {
            "12": "Nossa Senhora Aparecida"
        },
        "Novembro": {
            "2": "Finados",
            "15": "Proclamação da República",
            "20": "Dia da Consciência Negra",
        },
        "Dezembro": {
            "25": "Natal"
        }
    };

    const diaCarnaval = carnaval.getDate();
    const mesCarnaval = carnaval.getMonth() + 1;
    const diaCorpusChristi = corpusChristi.getDate();

    if(mesCarnaval == 2){
        feriadosNacionais['Fevereiro'] = {
            [diaCarnaval]: 'Carnaval',
        }
    } else{
        feriadosNacionais['Março'] = {
            [diaCarnaval]: 'Carnaval',
        }
    }

    feriadosNacionais['Junho'] = {
        [diaCorpusChristi]: 'Corpus Christ',
    }

    
    const diasUteisP = document.querySelector('.dias-uteis p:nth-of-type(2)');
    const diasCorridosP = document.querySelector('.dias-corridos p:nth-of-type(2)');
    const sabadosP = document.querySelector('.sabados p:nth-of-type(2)');
    const domingosP = document.querySelector('.domingos p:nth-of-type(2)');
    const feriadosNacionaisP = document.querySelector('.feriados-nacionais p:nth-of-type(2)');

    const calculadoraSmall = document.querySelector('.calculadora small');
    const dataInicioInput = document.querySelector('#data_inicio');
    const dataFimInput = document.querySelector('#data_fim');
    
    document.addEventListener('submit', e => {

        e.preventDefault();
        calculadoraSmall.innerHTML = '';
        
        let dataInicio;
        let dataFim;

        if(dataInicioInput.value){
            dataInicio =  new Date(dataInicioInput.value + ' 22:00:00');
        } else{
            calculadoraSmall.innerHTML = 'A data inicial não pode ficar vazia!';
            return;
        }
        
        if(dataFimInput.value){
            dataFim = new Date(dataFimInput.value + ' 22:00:00');
        } else{
            calculadoraSmall.innerHTML = 'A data final não pode ficar vazia!';
            return;
        }

        let diferencaDias = (dataFim - dataInicio) / (1000 * 60 * 60 * 24) ;
        if(diferencaDias < 0){
            calculadoraSmall.innerHTML = 'A data final deve ser maior que a data inicial. Por favor, insira as datas de forma correta!';
        } else{
            let dataTemporaria = new Date(dataInicioInput.value + ' 22:00:00');
            
            let domingosQTD = 0;
            let sabadosQTD = 0;
            let diasUteisQTD = 0;
            let feriadosQTD = 0;

            //console.log(feriadosNacionais);
            while(true){
                //console.log(dataTemporaria);
                if(dataTemporaria > dataFim) {
                    break;
                }
                let diaSemana = dataTemporaria.getDay() + 1;
                // 1 – Domingo / 7 - Sábado
                let diaTemporario = dataTemporaria.getDate();

                let mesTemporario = dataTemporaria.getMonth();
                mesTemporario = meses[mesTemporario];
                if(feriadosNacionais[mesTemporario][diaTemporario]){
                    feriadosQTD++;
                } 

                if(diaSemana == 1){
                    domingosQTD++;
                } else if(diaSemana == 7){
                    sabadosQTD++;
                } else{
                    diasUteisQTD++;
                }

                dataTemporaria.setDate(diaTemporario + 1);
            };
            
            diasUteisP.innerHTML = diasUteisQTD;
            diasCorridosP.innerHTML = diferencaDias + 1;
            sabadosP.innerHTML = sabadosQTD;
            domingosP.innerHTML = domingosQTD;
            feriadosNacionaisP.innerHTML = feriadosQTD;
        }

    });

})();