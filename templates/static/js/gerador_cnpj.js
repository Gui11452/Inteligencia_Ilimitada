(function(){

    function gerarCNPJ() {
        while(true) {
            // Gera a base do CNPJ com 12 dígitos
            let cnpj = Math.floor(Math.random() * (999999999999 - 100000000000) + 100000000000);
            cnpj = cnpj.toString();
        
            // Calcula o primeiro dígito verificador
            const sequencia1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            let soma1 = 0;
            for (let i = 0; i < 12; i++) {
                soma1 += cnpj[i] * sequencia1[i];
            }
            let x1 = 11 - (soma1 % 11);
            if (x1 >= 10) x1 = 0;

            // Calcula o segundo dígito verificador
            const sequencia2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            let soma2 = 0;
            for (let i = 0; i < 12; i++) {
                soma2 += cnpj[i] * sequencia2[i];
            }
            soma2 += x1 * sequencia2[12];
            let x2 = 11 - (soma2 % 11);
            if (x2 >= 10) x2 = 0;
        
            cnpj += x1.toString() + x2.toString();
        
            if (cnpj.length > 14) {
                console.log(`O CNPJ só pode ter 14 números no máximo!`);
                continue;
            }
        
            cnpj = formataouDesformataCNPJ(cnpj);
            return cnpj;
        }
    };
    
    function formataouDesformataCNPJ(cnpj, desformata = false, formata = true) {
        if (formata) desformata = false;  
        if (!(formata)) desformata = true;   
    
        const lista = []
        for (let i of cnpj){
            lista.push(i);
        };
        if (formata){
            lista.splice(2,0,'.');
            lista.splice(6,0,'.');
            lista.splice(10,0,'/');
            lista.splice(15,0,'-');
        } else if(desformata){
            lista.splice(2,1);
            lista.splice(5,1);
            lista.splice(8,1);
            lista.splice(12,1);
        }
        const cnpjFormatado = lista.join('');
        return cnpjFormatado;
    };
    
    const resultadoCNPJ = document.querySelector('.cnpj p');
    const resultadoIMG = document.querySelector('.cnpj img');
    const resultadoSpan = document.querySelector('.cnpj span');

    document.addEventListener('submit', e => {
        e.preventDefault();
        resultadoIMG.style.display = 'inline-block';
        resultadoCNPJ.innerHTML = gerarCNPJ();

    })

    document.addEventListener('click', e => {
        const el = e.target;
        if(el == resultadoIMG){
            navigator.clipboard.writeText(resultadoCNPJ.innerText);
            resultadoSpan.style.display = 'inline-block';
            setTimeout(() => {
                resultadoSpan.style.display = 'none';
            }, 2000);
        }
    })


})();