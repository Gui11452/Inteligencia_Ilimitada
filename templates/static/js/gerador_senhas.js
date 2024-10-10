(function(){

    function gerarSenha(tamanho=12, tipoDaSenha, conteudosSenhas) {
        const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
        const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digitos = '0123456789';
        const caracteresEspeciais = '!@#$%&*._-';

        let caracteresTemporarios = '';

        for(let c of conteudosSenhas){
            if(c == 'Letra maiúscula'){
                caracteresTemporarios+=letrasMaiusculas;
            }
            if(c == 'Letra minúscula'){
                caracteresTemporarios+=letrasMinusculas;
            }
            if(c == 'Números'){
                caracteresTemporarios+=digitos;
            }
            if(c == 'Símbolos'){
                caracteresTemporarios+=caracteresEspeciais;
            }
        }
        if(tipoDaSenha == 'Fácil de pronunciar'){
            caracteresTemporarios+=letrasMaiusculas;
            caracteresTemporarios+=letrasMinusculas; 
        } else if(tipoDaSenha == 'Fácil de ler'){
            let n = Math.floor(Math.random() * (100 - 0) + 0);
            //let ambiguidade = ['l', 1, 0, 'O'];
            console.log(n);
            if(n % 2 == 0){
                let indice = caracteresTemporarios.indexOf('1');
                caracteresTemporarios = caracteresTemporarios.split('');
                caracteresTemporarios[indice] = caracteresTemporarios[Math.floor(Math.random() * ((caracteresTemporarios.length - 1) - 0) + 0)];
                caracteresTemporarios = caracteresTemporarios.join('');

                indice = caracteresTemporarios.indexOf('O');
                caracteresTemporarios = caracteresTemporarios.split('');
                caracteresTemporarios[indice] = caracteresTemporarios[Math.floor(Math.random() * ((caracteresTemporarios.length - 1) - 0) + 0)];
                caracteresTemporarios = caracteresTemporarios.join('');
            } else{
                let indice = caracteresTemporarios.indexOf('l');
                caracteresTemporarios = caracteresTemporarios.split('');
                caracteresTemporarios[indice] = caracteresTemporarios[Math.floor(Math.random() * ((caracteresTemporarios.length - 1) - 0) + 0)];
                caracteresTemporarios = caracteresTemporarios.join('');

                indice = caracteresTemporarios.indexOf('L');
                caracteresTemporarios = caracteresTemporarios.split('');
                caracteresTemporarios[indice] = caracteresTemporarios[Math.floor(Math.random() * ((caracteresTemporarios.length - 1) - 0) + 0)];
                caracteresTemporarios = caracteresTemporarios.join('');

                indice = caracteresTemporarios.indexOf('0');
                caracteresTemporarios = caracteresTemporarios.split('');
                caracteresTemporarios[indice] = caracteresTemporarios[Math.floor(Math.random() * ((caracteresTemporarios.length - 1) - 0) + 0)];
                caracteresTemporarios = caracteresTemporarios.join('');
            }
        }

        let senha = '';
        for (let i = 0; i < tamanho; i++) {
            const randomIndex = Math.floor(Math.random() * caracteresTemporarios.length);
            senha += caracteresTemporarios[randomIndex];
        }
        return senha;
    }

    const campoSenha = document.querySelector('.campo-senha>div:nth-of-type(1)>p');
    const qtdCaracteres = document.querySelector('#qtd_caracteres');
    const range = document.querySelector('#range');
    const tipoSenha = document.getElementsByName('tipo-senha');
    const conteudoSenha = document.getElementsByName('conteudo-senha');
    
    const resultadoSpan = document.querySelector('.botoes span');
    const botaoCopiar = document.querySelector('.campo-senha a');

    const indicador = document.querySelector('.indicador');

    const img1 = document.querySelector('.campo-senha>div:nth-of-type(1) img:nth-of-type(1)');
    const img2 = document.querySelector('.campo-senha>div:nth-of-type(1) img:nth-of-type(2)');

    function captarDados(){
        let tipoDaSenha;
        for(let t = 0; t < tipoSenha.length; t++){
            if(tipoSenha[t].checked){
                tipoDaSenha = tipoSenha[t].value;
                break;
            }
        }

        let conteudosSenhas = [];
        for(let c = 0; c < conteudoSenha.length; c++){
            if(conteudoSenha[c].checked){
                conteudosSenhas.push(conteudoSenha[c].value);
            }
        }

        if(qtdCaracteres.value >= 11){
            indicador.style.width = '100%';
            indicador.style.background = '#006b4d';
        } else if(qtdCaracteres.value >= 9 && qtdCaracteres.value < 11){
            indicador.style.width = '70%';
            indicador.style.background = '#00a877';
        } else if(qtdCaracteres.value >= 6 && qtdCaracteres.value < 9){
            indicador.style.width = '50%';
            indicador.style.background = '#efc20f';
        } else if(qtdCaracteres.value >= 4 && qtdCaracteres.value < 6){
            indicador.style.width = '30%';
            indicador.style.background = '#df6661';
        } else{
            indicador.style.width = '0%';
            indicador.style.background = 'transparent';
        }

        campoSenha.innerHTML = gerarSenha(qtdCaracteres.value, tipoDaSenha, conteudosSenhas);
    }

    for(let c = 0; c < conteudoSenha.length; c++){
        conteudoSenha[c].checked = true;
    }
    range.value = qtdCaracteres.value;

    for(let c = 0; c < tipoSenha.length; c++){
        if(tipoSenha[c].value == 'Todos os caracteres'){
            tipoSenha[c].checked = true;
            break;
        };
    }

    captarDados();

    document.addEventListener('submit', e => {
        e.preventDefault();
        const el = e.target;
        
        captarDados();

    })

    document.addEventListener('input', e => {
        e.preventDefault();
        const el = e.target
        
        if(el == qtdCaracteres){
            range.value = el.value;
        }

        if(el == range){
            qtdCaracteres.value = el.value;
        }

        let i = 0;
        for(let c = 0; c < conteudoSenha.length; c++){
            if(!conteudoSenha[c].checked){
                if(i == 3 && el.getAttribute('type') == 'checkbox'){
                    el.checked = true;
                    break;
                }
                i+=1;
            }
        }

        captarDados();

    })

    document.addEventListener('click', e => {
        const el = e.target;
        if(el == img1 || el == botaoCopiar){
            e.preventDefault();
            navigator.clipboard.writeText(campoSenha.innerText);
            resultadoSpan.style.display = 'inline-block';
            setTimeout(() => {
                resultadoSpan.style.display = 'none';
            }, 2000);
        }
        if(el == img2){
            captarDados();
        }
    })


})();