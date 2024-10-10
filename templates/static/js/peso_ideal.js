(function(){

    const peso = document.querySelector('#peso');
    const altura = document.querySelector('#altura');

    const muitoAbaixoPesoDiv = document.querySelector('.resultados>div>div.muito-abaixo-peso');
    const muitoAbaixoPesoP = document.querySelector('.resultados>div>div.muito-abaixo-peso p:nth-of-type(1)');

    const abaixoPesoDiv = document.querySelector('.resultados>div>div.abaixo-peso');
    const abaixoPesoP = document.querySelector('.resultados>div>div.abaixo-peso p:nth-of-type(1)');

    const pesoNormalDiv = document.querySelector('.resultados>div>div.peso-normal');
    const pesoNormaP = document.querySelector('.resultados>div>div.peso-normal p:nth-of-type(1)');

    const acimaPesoDiv = document.querySelector('.resultados>div>div.acima-peso');
    const acimaPesoP = document.querySelector('.resultados>div>div.acima-peso p:nth-of-type(1)');

    const obesidadeGrau1Div = document.querySelector('.resultados>div>div.obesidade-grau-1');
    const obesidadeGrau1P = document.querySelector('.resultados>div>div.obesidade-grau-1 p:nth-of-type(1)');

    const obesidadeGrau2Div = document.querySelector('.resultados>div>div.obesidade-grau-2');
    const obesidadeGrau2P = document.querySelector('.resultados>div>div.obesidade-grau-2 p:nth-of-type(1)');

    const obesidadeGrau3Div = document.querySelector('.resultados>div>div.obesidade-grau-3');
    const obesidadeGrau3P = document.querySelector('.resultados>div>div.obesidade-grau-3 p:nth-of-type(1)');

    const h2 = document.querySelector('.resultados>h2');

    document.addEventListener('submit', e => {

        e.preventDefault();

        const imc = peso.value / ((altura.value / 100) ** 2);

        const peso1 = (((altura.value / 100) ** 2) * 17).toFixed(2);
        muitoAbaixoPesoP.innerHTML = `< ${peso1} kg`;

        const peso2 = (((altura.value / 100) ** 2) * 18.5).toFixed(2);
        abaixoPesoP.innerHTML = `${peso1} a ${peso2} kg`;

        const peso3 = (((altura.value / 100) ** 2) * 25).toFixed(2);
        pesoNormaP.innerHTML = `${peso2} a ${peso3} kg`;

        const peso4 = (((altura.value / 100) ** 2) * 30).toFixed(2);
        acimaPesoP.innerHTML = `${peso3} a ${peso4} kg`;

        const peso5 = (((altura.value / 100) ** 2) * 35).toFixed(2);
        obesidadeGrau1P.innerHTML = `${peso4} a ${peso5} kg`;

        const peso6 = (((altura.value / 100) ** 2) * 40).toFixed(2);
        obesidadeGrau2P.innerHTML = `${peso5} a ${peso6} kg`;
        obesidadeGrau3P.innerHTML = `> ${peso6} kg`;

        h2.innerHTML = `Resultado: ${imc.toFixed(2)} (kg/m²)`;

        if(imc < 17){
            muitoAbaixoPesoDiv.classList.add('selecionado');
            abaixoPesoDiv.classList.remove('selecionado');
            pesoNormalDiv.classList.remove('selecionado');
            acimaPesoDiv.classList.remove('selecionado');
            obesidadeGrau1Div.classList.remove('selecionado');
            obesidadeGrau2Div.classList.remove('selecionado');
            obesidadeGrau3Div.classList.remove('selecionado');
        } else if(imc < 18.5){
            muitoAbaixoPesoDiv.classList.remove('selecionado');
            abaixoPesoDiv.classList.add('selecionado');
            pesoNormalDiv.classList.remove('selecionado');
            acimaPesoDiv.classList.remove('selecionado');
            obesidadeGrau1Div.classList.remove('selecionado');
            obesidadeGrau2Div.classList.remove('selecionado');
            obesidadeGrau3Div.classList.remove('selecionado');
        } else if(imc < 25){
            muitoAbaixoPesoDiv.classList.remove('selecionado');
            abaixoPesoDiv.classList.remove('selecionado');
            pesoNormalDiv.classList.add('selecionado');
            acimaPesoDiv.classList.remove('selecionado');
            obesidadeGrau1Div.classList.remove('selecionado');
            obesidadeGrau2Div.classList.remove('selecionado');
            obesidadeGrau3Div.classList.remove('selecionado');
        } else if(imc < 30){
            muitoAbaixoPesoDiv.classList.remove('selecionado');
            abaixoPesoDiv.classList.remove('selecionado');
            pesoNormalDiv.classList.remove('selecionado');
            acimaPesoDiv.classList.add('selecionado');
            obesidadeGrau1Div.classList.remove('selecionado');
            obesidadeGrau2Div.classList.remove('selecionado');
            obesidadeGrau3Div.classList.remove('selecionado');
        } else if(imc < 35){
            muitoAbaixoPesoDiv.classList.remove('selecionado');
            abaixoPesoDiv.classList.remove('selecionado');
            pesoNormalDiv.classList.remove('selecionado');
            acimaPesoDiv.classList.remove('selecionado');
            obesidadeGrau1Div.classList.add('selecionado');
            obesidadeGrau2Div.classList.remove('selecionado');
            obesidadeGrau3Div.classList.remove('selecionado');
        } else if(imc < 40){
            muitoAbaixoPesoDiv.classList.remove('selecionado');
            abaixoPesoDiv.classList.remove('selecionado');
            pesoNormalDiv.classList.remove('selecionado');
            acimaPesoDiv.classList.remove('selecionado');
            obesidadeGrau1Div.classList.remove('selecionado');
            obesidadeGrau2Div.classList.add('selecionado');
            obesidadeGrau3Div.classList.remove('selecionado');
        } else if(imc >= 40){
            muitoAbaixoPesoDiv.classList.remove('selecionado');
            abaixoPesoDiv.classList.remove('selecionado');
            pesoNormalDiv.classList.remove('selecionado');
            acimaPesoDiv.classList.remove('selecionado');
            obesidadeGrau1Div.classList.remove('selecionado');
            obesidadeGrau2Div.classList.remove('selecionado');
            obesidadeGrau3Div.classList.add('selecionado');
        }
        

    });

})();