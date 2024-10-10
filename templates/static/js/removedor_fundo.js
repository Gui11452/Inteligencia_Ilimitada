(function(){

    const dropZone = document.querySelector('.drop-zone');
    const fileInput = document.querySelector('#file_before');
    const imgBefore = document.querySelector('#img_before');

    const loader = document.querySelector('.loader');
    const label = document.querySelector('.drop-zone label');
    const p = document.querySelector('.drop-zone p');

    // Previne comportamento padrão ao arrastar arquivos para o navegador
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    document.addEventListener('drop', (e) => {
        e.preventDefault();
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;

            loader.style.display = 'block';
            label.style.display = 'none';
            p.style.display = 'none';

            setTimeout(() => {
                dropZone.submit();
            }, 2000);
        }
    });

    document.addEventListener('input', (e) => {
        loader.style.display = 'block';
        label.style.display = 'none';
        p.style.display = 'none';

        setTimeout(() => {
            dropZone.submit();
        }, 2000);
    });


})();
