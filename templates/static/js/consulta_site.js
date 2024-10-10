(function(){

    const veracidadeP = document.querySelectorAll('.veracidade p');
    const popularidadeP = document.querySelectorAll('.popularidade p');
    const tempoP = document.querySelectorAll('.tempo p');
    const httpsP = document.querySelectorAll('.https p');
    const sslP = document.querySelectorAll('.ssl p');

    const divResultados = document.querySelector('.resultados');

    const inputURL = document.querySelector('#url');
    const inputSubmit = document.querySelector('#scannear');
    const loader = document.querySelector('.loader');

    function createImage(block=false){
        const img = document.createElement('img');
        img.setAttribute('alt', 'Consultar Sites - Inteligência Ilimitada');
        if(block){
            img.setAttribute('src', '/static/images/block.png');
        } else{
            img.setAttribute('src', '/static/images/ok.png');
        }
        return img;
    }

    function createSpan(word){
        const span = document.createElement('span');
        span.innerHTML = word;
        return span;
    }

    function insertData(element, word, valid=true, is_image=true, is_word=true){
        element.innerHTML = '';

        if(valid){
            element.classList.remove('red');
            element.classList.add('green');

            if(is_image){
                element.appendChild(createImage(false));
            };

            if(is_word){
                element.appendChild(createSpan(word));
            };

        } else{
            element.classList.add('red');
            element.classList.remove('green');

            if(is_image){
                element.appendChild(createImage(true));
            };

            if(is_word){
                element.appendChild(createSpan(word));
            };
        }

    }

    function analyzeWebsite(url){
        const wsProtocol = window.location.protocol;
        const wsHost = window.location.host;
        fetch(`${wsProtocol}//${wsHost}/verificar_link/?url=${url}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data);

            if(data.valid_domain){
                insertData(veracidadeP[1], 'Validado', true);
                insertData(veracidadeP[2], 'Nossa equipe analisou e validou esse site.', true, false, true);
            } else{
                insertData(veracidadeP[1], 'Invalidado', false);
                insertData(veracidadeP[2], 'Nossa equipe analisou e invalidou esse site.', false, false, true);
            }

            if(data.popular_domain){
                insertData(popularidadeP[1], 'Popular', true);
                insertData(popularidadeP[2], 'Esse tipo de domínio é popular no Brasil.', true, false, true);
            } else{
                insertData(popularidadeP[1], 'Impopular', false);
                insertData(popularidadeP[2], 'Esse tipo de domínio NÃO é popular no Brasil.', false, false, true);
            }

            if(data.domain_age.is_new_site){
                insertData(tempoP[1], data.domain_age.age_description, false);
                insertData(tempoP[2], 'Esse site existe há pouco tempo.', false, false, true);
            } else{
                insertData(tempoP[1], data.domain_age.age_description, true);
                insertData(tempoP[2], 'Esse site existe há um bom tempo. Isso é bom.', true, false, true);
            }

            if(!data.valid_domain){
                insertData(tempoP[1], 'Inválido', false);
                insertData(tempoP[2], 'Inválido', false, false, true);
            }

            if(data.ssl_valid){
                insertData(httpsP[1], 'Ativo', true);
                insertData(httpsP[2], 'Possui o https.', true, false, true);
                
                insertData(sslP[1], 'Ativo', true);
                insertData(sslP[2], 'Selo SSL válido. Isso é bom.', true, false, true);
            } else{
                insertData(httpsP[1], 'Inativo', false);
                insertData(httpsP[2], 'NÃO possui o https.', false, false, true);

                insertData(sslP[1], 'Inativo', false);
                insertData(sslP[2], 'Selo SSL inválido. Isso é ruim.', false, false, true);
            }         

            divResultados.style.display = 'flex';
            inputSubmit.style.display = 'inline-block';
            loader.style.display = 'none';
        });
    }

    document.addEventListener('submit', e => {
        e.preventDefault();
        inputSubmit.style.display = 'none';
        loader.style.display = 'inline-block';

        const url = inputURL.value;
        if(url){
            analyzeWebsite(url);
        } else{
            console.log('URL vazio');
        }
    });

})();