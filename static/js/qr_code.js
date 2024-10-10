(function(){

    function validaCPF(cpf){
        if (typeof cpf === 'number'){
            cpf = cpf.toString();
        };
    
        //console.log(cpf)
    
        if (!(cpf.indexOf('.') === -1 || (cpf.indexOf('-')) === -1)){
            cpf = formataouDesformataCPF(cpf, true, false);
        }
    
        if (cpf.length > 11){
            //console.log(`O cpf só pode ter 11 números no máximo!`);
            return;
        }
        
        let caracteresIguais = cpf + cpf[0];
        if(Number(caracteresIguais) % 11 === 0){
            //console.log('O cpf não pode ter todos os números iguais!');
            return;
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
            //console.log(`O CPF ${cpf} é válido!`)
            return true;
        } else{
            //console.log(`O CPF ${cpf} é inválido!`)
            return;
        }
    };

    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
        
        if (cnpj.length !== 14) {
            return false; // CNPJ deve ter 14 dígitos
        }
        
        // Verifica se todos os dígitos são iguais (CNPJ inválido)
        if (/^(\d)\1+$/.test(cnpj)) {
            return false;
        }
        
        const sequencia1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const sequencia2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
        // Calcula o primeiro dígito verificador
        let soma1 = 0;
        for (let i = 0; i < 12; i++) {
            soma1 += cnpj[i] * sequencia1[i];
        }
        let x1 = 11 - (soma1 % 11);
        if (x1 >= 10) x1 = 0;
    
        // Calcula o segundo dígito verificador
        let soma2 = 0;
        for (let i = 0; i < 12; i++) {
            soma2 += cnpj[i] * sequencia2[i];
        }
        soma2 += x1 * sequencia2[12];
        let x2 = 11 - (soma2 % 11);
        if (x2 >= 10) x2 = 0;
    
        // Verifica se os dígitos calculados conferem com os fornecidos
        if (cnpj[12] == x1 && cnpj[13] == x2) {
            return true;
        } else {
            return false;
        }
    }

    const campoLink = document.querySelector('#campo_link');
    const campoWhatsapp = document.querySelector('#campo_whatsapp');
    const campoEmail = document.querySelector('#campo_email');
    const campoSms = document.querySelector('#campo_sms');
    const campoPix = document.querySelector('#campo_pix');
    const campoWifi = document.querySelector('#campo_wifi');

    const loader = document.querySelector('.loader');
    const botaoGerar = document.querySelector('#botao-gerar');

    const campos = document.querySelectorAll('.gerador>div:nth-of-type(1) input');

    const label = document.querySelectorAll('.gerador>div:nth-of-type(1)>label');

    const inputLink = document.querySelector('#link');
    const inputNumeroWhatsapp = document.querySelector('#numero_whatsapp');
    const inputTextoWhatsapp = document.querySelector('#texto_whatsapp');
    const inputEmail = document.querySelector('#email');
    const inputSmsNumber = document.querySelector('#sms_number');
    const inputSmsMensagem = document.querySelector('#sms_mensagem');

    const inputChavePixTelefone = document.getElementsByName('chave_pix_telefone');
    const inputChavePixEmail = document.getElementsByName('chave_pix_email');
    const inputChavePixCPF = document.getElementsByName('chave_pix_cpf');
    const inputChavePixCNPJ = document.getElementsByName('chave_pix_cnpj');
    const inputChavePixOutro = document.getElementsByName('chave_pix_outro');
    const inputNomePix = document.querySelector('#nome_pix');
    const inputCidadePix = document.querySelector('#cidade_pix');
    const inputValorPix = document.querySelector('#valor_pix');
    const inputCodigoPix = document.querySelector('#codigo_pix');

    const inputNomeRede = document.querySelector('#nome_rede');
    const inputSenhaRede = document.querySelector('#senha_rede');
    const inputEncriptacaoRede = document.querySelector('#encriptacao_rede');
    const inpuOcultacaoRede = document.querySelector('#ocultacao_rede');

    const errorLink = document.querySelector('.error_link');
    const errorWhatsapp = document.querySelector('.error_whatsapp');
    const errorEmail = document.querySelector('.error_email');
    const errorSms = document.querySelector('.error_sms');
    const errorPix = document.querySelector('.error_pix');
    const errorWifi = document.querySelector('.error_wifi');

    errorLink.innerHTML = '';
    errorWhatsapp.innerHTML = '';
    errorEmail.innerHTML = '';
    errorSms.innerHTML = '';
    errorPix.innerHTML = '';
    errorWifi.innerHTML = '';

    inputCodigoPix.addEventListener('keypress', function(e) {
        if (e.which === 32) {
            e.preventDefault();
        }
    });

    document.addEventListener('click', e => {
        const el = e.target;

        for(let i = 0; i < label.length; i++){
            if(el == label[i] && el.getAttribute('for') == 'radio_link'){
                label[0].classList.add('selecionado');
                label[1].classList.remove('selecionado');
                label[2].classList.remove('selecionado');
                label[3].classList.remove('selecionado');
                label[4].classList.remove('selecionado');
                label[5].classList.remove('selecionado');
            } else if(el == label[i] && el.getAttribute('for') == 'radio_whatsapp'){
                label[0].classList.remove('selecionado');
                label[1].classList.add('selecionado');
                label[2].classList.remove('selecionado');
                label[3].classList.remove('selecionado');
                label[4].classList.remove('selecionado');
                label[5].classList.remove('selecionado');
            } else if(el == label[i] && el.getAttribute('for') == 'radio_email'){
                label[0].classList.remove('selecionado');
                label[1].classList.remove('selecionado');
                label[2].classList.add('selecionado');
                label[3].classList.remove('selecionado');
                label[4].classList.remove('selecionado');
                label[5].classList.remove('selecionado');
            } else if(el == label[i] && el.getAttribute('for') == 'radio_sms'){
                label[0].classList.remove('selecionado');
                label[1].classList.remove('selecionado');
                label[2].classList.remove('selecionado');
                label[3].classList.add('selecionado');
                label[4].classList.remove('selecionado');
                label[5].classList.remove('selecionado');
            } else if(el == label[i] && el.getAttribute('for') == 'radio_pix'){
                label[0].classList.remove('selecionado');
                label[1].classList.remove('selecionado');
                label[2].classList.remove('selecionado');
                label[3].classList.remove('selecionado');
                label[4].classList.add('selecionado');
                label[5].classList.remove('selecionado');
            } else if(el == label[i] && el.getAttribute('for') == 'radio_wifi'){
                label[0].classList.remove('selecionado');
                label[1].classList.remove('selecionado');
                label[2].classList.remove('selecionado');
                label[3].classList.remove('selecionado');
                label[4].classList.remove('selecionado');
                label[5].classList.add('selecionado');
            }
        }
    });

    document.addEventListener('input', e => {

        const el = e.target;

        if(el.getAttribute('name') == 'selecionar-tipo-chave-pix' && el.value == 'Telefone'){
            inputChavePixTelefone[0].classList.remove('ocultar');
            inputChavePixEmail[0].classList.add('ocultar');
            inputChavePixCPF[0].classList.add('ocultar');
            inputChavePixCNPJ[0].classList.add('ocultar');
            inputChavePixOutro[0].classList.add('ocultar');

            inputChavePixEmail[0].value = '';
            inputChavePixCPF[0].value = '';
            inputChavePixCNPJ[0].value = '';
            inputChavePixOutro[0].value = '';

        } else if(el.getAttribute('name') == 'selecionar-tipo-chave-pix' && el.value == 'Email'){
            inputChavePixTelefone[0].classList.add('ocultar');
            inputChavePixEmail[0].classList.remove('ocultar');
            inputChavePixCPF[0].classList.add('ocultar');
            inputChavePixCNPJ[0].classList.add('ocultar');
            inputChavePixOutro[0].classList.add('ocultar');

            inputChavePixTelefone[0].value = '';
            inputChavePixCPF[0].value = '';
            inputChavePixCNPJ[0].value = '';
            inputChavePixOutro[0].value = '';

        } else if(el.getAttribute('name') == 'selecionar-tipo-chave-pix' && el.value == 'CPF'){
            inputChavePixTelefone[0].classList.add('ocultar');
            inputChavePixEmail[0].classList.add('ocultar');
            inputChavePixCPF[0].classList.remove('ocultar');
            inputChavePixCNPJ[0].classList.add('ocultar');
            inputChavePixOutro[0].classList.add('ocultar');

            inputChavePixTelefone[0].value = '';
            inputChavePixEmail[0].value = '';
            inputChavePixCNPJ[0].value = '';
            inputChavePixOutro[0].value = '';

        } else if(el.getAttribute('name') == 'selecionar-tipo-chave-pix' && el.value == 'CNPJ'){
            inputChavePixTelefone[0].classList.add('ocultar');
            inputChavePixEmail[0].classList.add('ocultar');
            inputChavePixCPF[0].classList.add('ocultar');
            inputChavePixCNPJ[0].classList.remove('ocultar');
            inputChavePixOutro[0].classList.add('ocultar');

            inputChavePixTelefone[0].value = '';
            inputChavePixEmail[0].value = '';
            inputChavePixCPF[0].value = '';
            inputChavePixOutro[0].value = '';

        } else if(el.getAttribute('name') == 'selecionar-tipo-chave-pix' && el.value == 'Outro'){
            inputChavePixTelefone[0].classList.add('ocultar');
            inputChavePixEmail[0].classList.add('ocultar');
            inputChavePixCPF[0].classList.add('ocultar');
            inputChavePixCNPJ[0].classList.add('ocultar');
            inputChavePixOutro[0].classList.remove('ocultar');

            inputChavePixTelefone[0].value = '';
            inputChavePixEmail[0].value = '';
            inputChavePixCPF[0].value = '';
            inputChavePixCNPJ[0].value = '';

        }

        if(el.getAttribute('id') == 'radio_link'){
            campoLink.classList.remove('ocultar');
            campoWhatsapp.classList.add('ocultar');
            campoEmail.classList.add('ocultar');
            campoSms.classList.add('ocultar');
            campoPix.classList.add('ocultar');
            campoWifi.classList.add('ocultar');
            botaoGerar.style.display = 'inline-block';
            
            // Zerando os outros inputs
            inputNumeroWhatsapp.value = '';
            inputTextoWhatsapp.value = '';
            inputEmail.value = '';
            inputSmsNumber.value = '';
            inputSmsMensagem.value = '';

            inputChavePixTelefone.value = '';
            inputChavePixEmail.value = '';
            inputChavePixCPF.value = '';
            inputChavePixCNPJ.value = '';
            inputChavePixOutro.value = '';
            inputNomePix.value = '';
            inputCidadePix.value = '';
            inputValorPix.value = '';
            inputCodigoPix.value = '';

            inputNomeRede.value = '';
            inputSenhaRede.value = '';
            inputEncriptacaoRede.value = '';
            inpuOcultacaoRede.value = '';

        } else if(el.getAttribute('id') == 'radio_whatsapp'){
            campoLink.classList.add('ocultar');
            campoWhatsapp.classList.remove('ocultar');
            campoEmail.classList.add('ocultar');
            campoSms.classList.add('ocultar');
            campoPix.classList.add('ocultar');
            campoWifi.classList.add('ocultar');
            botaoGerar.style.display = 'inline-block';


            // Zerando os outros inputs
            inputLink.value = '';
            inputEmail.value = '';
            inputSmsNumber.value = '';
            inputSmsMensagem.value = '';

            inputChavePixTelefone.value = '';
            inputChavePixEmail.value = '';
            inputChavePixCPF.value = '';
            inputChavePixCNPJ.value = '';
            inputChavePixOutro.value = '';
            inputNomePix.value = '';
            inputCidadePix.value = '';
            inputValorPix.value = '';
            inputCodigoPix.value = '';

            inputNomeRede.value = '';
            inputSenhaRede.value = '';
            inputEncriptacaoRede.value = '';
            inpuOcultacaoRede.value = '';


        } else if(el.getAttribute('id') == 'radio_email'){
            campoLink.classList.add('ocultar');
            campoWhatsapp.classList.add('ocultar');
            campoEmail.classList.remove('ocultar');
            campoSms.classList.add('ocultar');
            campoPix.classList.add('ocultar');
            campoWifi.classList.add('ocultar');
            botaoGerar.style.display = 'inline-block';


            // Zerando os outros inputs
            inputLink.value = '';
            inputNumeroWhatsapp.value = '';
            inputTextoWhatsapp.value = '';
            inputSmsNumber.value = '';
            inputSmsMensagem.value = '';

            inputChavePixTelefone.value = '';
            inputChavePixEmail.value = '';
            inputChavePixCPF.value = '';
            inputChavePixCNPJ.value = '';
            inputChavePixOutro.value = '';
            inputNomePix.value = '';
            inputCidadePix.value = '';
            inputValorPix.value = '';
            inputCodigoPix.value = '';

            inputNomeRede.value = '';
            inputSenhaRede.value = '';
            inputEncriptacaoRede.value = '';
            inpuOcultacaoRede.value = '';


        } else if(el.getAttribute('id') == 'radio_sms'){
            campoLink.classList.add('ocultar');
            campoWhatsapp.classList.add('ocultar');
            campoEmail.classList.add('ocultar');
            campoSms.classList.remove('ocultar');
            campoPix.classList.add('ocultar');
            campoWifi.classList.add('ocultar');
            botaoGerar.style.display = 'inline-block';


            // Zerando os outros inputs
            inputLink.value = '';
            inputNumeroWhatsapp.value = '';
            inputTextoWhatsapp.value = '';
            inputEmail.value = '';

            inputChavePixTelefone.value = '';
            inputChavePixEmail.value = '';
            inputChavePixCPF.value = '';
            inputChavePixCNPJ.value = '';
            inputChavePixOutro.value = '';
            inputNomePix.value = '';
            inputCidadePix.value = '';
            inputValorPix.value = '';
            inputCodigoPix.value = '';

            inputNomeRede.value = '';
            inputSenhaRede.value = '';
            inputEncriptacaoRede.value = '';
            inpuOcultacaoRede.value = '';


        } else if(el.getAttribute('id') == 'radio_pix'){
            campoLink.classList.add('ocultar');
            campoWhatsapp.classList.add('ocultar');
            campoEmail.classList.add('ocultar');
            campoSms.classList.add('ocultar');
            campoPix.classList.remove('ocultar');
            campoWifi.classList.add('ocultar');
            botaoGerar.style.display = 'inline-block';


            // Zerando os outros inputs
            inputLink.value = '';
            inputNumeroWhatsapp.value = '';
            inputTextoWhatsapp.value = '';
            inputEmail.value = '';
            inputSmsNumber.value = '';
            inputSmsMensagem.value = '';

            inputNomeRede.value = '';
            inputSenhaRede.value = '';
            inputEncriptacaoRede.value = '';
            inpuOcultacaoRede.value = '';


        } else if(el.getAttribute('id') == 'radio_wifi'){
            campoLink.classList.add('ocultar');
            campoWhatsapp.classList.add('ocultar');
            campoEmail.classList.add('ocultar');
            campoSms.classList.add('ocultar');
            campoPix.classList.add('ocultar');
            campoWifi.classList.remove('ocultar');
            botaoGerar.style.display = 'inline-block';


            // Zerando os outros inputs
            inputLink.value = '';
            inputNumeroWhatsapp.value = '';
            inputTextoWhatsapp.value = '';
            inputEmail.value = '';
            inputSmsNumber.value = '';
            inputSmsMensagem.value = '';

            inputChavePixTelefone.value = '';
            inputChavePixEmail.value = '';
            inputChavePixCPF.value = '';
            inputChavePixCNPJ.value = '';
            inputChavePixOutro.value = '';
            inputNomePix.value = '';
            inputCidadePix.value = '';
            inputValorPix.value = '';
            inputCodigoPix.value = '';

        }

    });

    document.addEventListener('submit', e => {

        let validador = true;
        let campo;

        for(let i  = 0; i < campos.length; i++){
            if(campos[i].checked){
                campo = campos[i].value;
                break;
            }
        }

        if(campo == 'link'){
            if(!inputLink.value){
                errorLink.innerHTML = 'O campo acima NÃO pode ficar vazio!'
                validador = false;
            }
        } else if(campo == 'whatsapp'){
            if(!inputNumeroWhatsapp.value || !inputTextoWhatsapp.value){
                errorWhatsapp.innerHTML = 'Os campos acima NÃO podem ficar vazios!'
                validador = false;
            }

        } else if(campo == 'email'){
            if(!inputEmail.value){
                errorEmail.innerHTML = 'O campo acima NÃO pode ficar vazio!'
                validador = false;
            }

        } else if(campo == 'sms'){
            if(!inputSmsNumber.value || !inputSmsMensagem.value){
                errorSms.innerHTML = 'Os campos acima NÃO podem ficar vazios!'
                validador = false;
            }

        } else if(campo == 'pix'){
            if((!inputChavePixTelefone[0].value 
                && !inputChavePixEmail[0].value 
                && !inputChavePixCPF[0].value
                && !inputChavePixCNPJ[0].value
                && !inputChavePixOutro[0].value) || !inputNomePix.value || !inputCidadePix.value){
                errorPix.innerHTML = 'Os campos acima NÃO podem ficar vazios. Apenas o VALOR e CÓDIGO são opcionais!'
                validador = false;
            }
            else if(inputChavePixCPF[0].value && !validaCPF(inputChavePixCPF[0].value)){
                errorPix.innerHTML = 'O cpf enviado NÃO é válido!'
                validador = false;
            }
            else if(inputChavePixCNPJ[0].value && !validarCNPJ(inputChavePixCNPJ[0].value)){
                errorPix.innerHTML = 'O cnpj enviado NÃO é válido!'
                validador = false;
            }

        } else if(campo == 'wifi'){
            if(!inputNomeRede.value || !inputEncriptacaoRede.value || !inpuOcultacaoRede.value){
                errorWifi.innerHTML = 'Os campos acima NÃO podem ficar vazios. Apenas a SENHA é opcional!'
                validador = false;
            }
        }

        if(!validador){
            e.preventDefault();
        } else{
            loader.style.display = 'inline-block';
            botaoGerar.style.display = 'none';
        }
    });

})();