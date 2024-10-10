from django.shortcuts import render, redirect
import qrcode
from django.contrib import messages
from .models import QRCodeImagens
from django.core.files.base import ContentFile
import io
from inteligencia.settings import MEDIA_ROOT
import os
import urllib.parse
from unidecode import unidecode

def gerador_cpf(request):
    return render(request, 'cpf.html')

def gerador_cnpj(request):
    return render(request, 'cnpj.html')

def gerador_senhas(request):
    return render(request, 'senhas.html')


def crc16_ccitt(pix_code):
    data = pix_code.encode('utf-8')

    crc = 0xFFFF
    for byte in data:
        crc ^= byte << 8
        for _ in range(8):
            if crc & 0x8000:
                crc = (crc << 1) ^ 0x1021
            else:
                crc <<= 1
            crc &= 0xFFFF
    return format(crc, '04X')


def qr_code(request):
    if request.method != 'POST':
        return render(request, 'qr_code.html')
    
    campo = request.POST.get('campo')

    link = request.POST.get('link')

    numero_whatsapp = request.POST.get('numero_whatsapp')
    texto_whatsapp = request.POST.get('texto_whatsapp')

    email = request.POST.get('email')

    sms_number = request.POST.get('sms_number')
    sms_mensagem = request.POST.get('sms_mensagem')
    
    chave_pix_telefone = request.POST.get('chave_pix_telefone')
    chave_pix_email = request.POST.get('chave_pix_email')
    chave_pix_cpf = request.POST.get('chave_pix_cpf')
    chave_pix_cnpj = request.POST.get('chave_pix_cnpj')
    chave_pix_outro = request.POST.get('chave_pix_outro')

    nome_pix = request.POST.get('nome_pix')
    cidade_pix = request.POST.get('cidade_pix')
    valor_pix = request.POST.get('valor_pix')
    codigo_pix = request.POST.get('codigo_pix')

    nome_rede = request.POST.get('nome_rede')
    senha_rede = request.POST.get('senha_rede', '')
    encriptacao_rede = request.POST.get('encriptacao_rede')
    ocultacao_rede = request.POST.get('ocultacao_rede')

    caminho_relativo = MEDIA_ROOT / 'qr_code' / '%Y'/ '%m' / '%d'

    if campo == 'link':
        if not link:
            messages.error(request, 'Preencha todos os campos obrigatórios de LINK')
            return render(request, 'qr_code.html')

        file_name = 'qrcode_link.png'

        string_enviada = link
        tipo = 'Link'

    elif campo == 'whatsapp':
        if not numero_whatsapp or not texto_whatsapp:
            messages.error(request, 'Preencha todos os campos obrigatórios de WHATSAPP')
            return render(request, 'qr_code.html')
        
        file_name = 'qrcode_whatsapp.png'

        numero = numero_whatsapp.replace('(', '').replace(')', '').replace(' ', '').replace('-', '').strip()
        texto_whatsapp = urllib.parse.quote(texto_whatsapp)
        string_enviada = f'https://api.whatsapp.com/send?phone=55{numero}&text={texto_whatsapp}'
        tipo = 'Whatsapp'

    elif campo == 'email':
        if not email:
            messages.error(request, 'Preencha todos os campos obrigatórios de EMAIL')
            return render(request, 'qr_code.html')
        
        file_name = 'qrcode_email.png'

        string_enviada = f'mailto:{email}'
        tipo = 'Email'

    elif campo == 'sms':
        if not sms_number or not sms_mensagem:
            messages.error(request, 'Preencha todos os campos obrigatórios de SMS')
            return render(request, 'qr_code.html')
        
        file_name = 'qrcode_sms.png'

        sms_number = sms_number.replace('(', '').replace(')', '').replace(' ', '').replace('-', '').strip()
        if sms_mensagem:
            sms_mensagem = urllib.parse.quote(sms_mensagem)
            string_enviada = f'sms:+55{sms_number}?body={sms_mensagem}'
        else:
            string_enviada = f'sms:+55{sms_number}'
        tipo = 'Sms'

    elif campo == 'pix':
        file_name = 'qrcode_pix.png'

        if not nome_pix or not cidade_pix or (not chave_pix_telefone and not chave_pix_email and not chave_pix_cpf and not chave_pix_cnpj and not chave_pix_outro):
            messages.error(request, 'Preencha todos os campos obrigatórios de PIX')
            return render(request, 'qr_code.html')
        
        nome_pix = unidecode(nome_pix)
        cidade_pix = unidecode(cidade_pix)
        if codigo_pix:
            codigo_pix = unidecode(codigo_pix).replace(' ', '')
        
        if chave_pix_telefone:
            chave_pix = chave_pix_telefone.replace('(', '').replace(')', '').replace('-', '').replace(' ', '').strip()
        elif chave_pix_email:
            chave_pix = chave_pix_email
        elif chave_pix_cpf:
            chave_pix = chave_pix_cpf.replace('.', '').replace('-', '').strip()
        elif chave_pix_cnpj:
            chave_pix = chave_pix_cnpj.replace('.', '').replace('-', '').strip()
        elif chave_pix_outro:
            chave_pix = chave_pix_outro
        else:
            messages.error(request, 'Preencha a chave pix.')
            return render(request, 'qr_code.html')
        
        if len(valor_pix) == 1 or len(valor_pix) == 2:
            valor_pix = f'{valor_pix}.00'


        subparte1 = '00020126'
        subparte2 = f'0014BR.GOV.BCB.PIX01{len(chave_pix)}{chave_pix}'

        if valor_pix:
            subparte3 = f'54{len(valor_pix)}{valor_pix}' if len(valor_pix) >= 10 else f'540{len(valor_pix)}{valor_pix}'
        else:
            subparte3 = ''

        subparte4 = f'59{len(nome_pix)}{nome_pix}' if len(nome_pix) >= 10 else f'590{len(nome_pix)}{nome_pix}'

        subparte5 = f'60{len(cidade_pix)}{cidade_pix}' if len(cidade_pix) >= 10 else f'600{len(cidade_pix)}{cidade_pix}'

        if codigo_pix:
            subparte6 = f'05{len(codigo_pix)}{codigo_pix}' if len(codigo_pix) >= 10 else f'050{len(codigo_pix)}{codigo_pix}'
            subparte6 = f'{len(subparte6)}{subparte6}' if len(subparte6) >= 10 else f'0{len(subparte6)}{subparte6}'
        else:
            subparte6 = '070503***'

        sub_string_enviada = f'{subparte1}{len(subparte2)}{subparte2}520400005303986{subparte3}5802BR{subparte4}{subparte5}62{subparte6}6304'
        crc = crc16_ccitt(sub_string_enviada)
        string_enviada = f'{sub_string_enviada}{crc}'
        
        tipo = 'Pix'

    elif campo == 'wifi':
        file_name = 'qrcode_wifi.png'

        if not nome_rede or not encriptacao_rede or not ocultacao_rede:
            messages.error(request, 'Preencha todos os campos obrigatórios de WIFI')
            return render(request, 'qr_code.html')
        
        if senha_rede:
            senha_rede = f';P:{senha_rede}'

        string_enviada = f'WIFI:S:{nome_rede};T:{encriptacao_rede}{senha_rede};H:{ocultacao_rede};;'
        
        tipo = 'Wifi'

    else:
        messages.error(request, 'Campo inválido. Por favor, contate o suporte do site.')
        return render(request, 'qr_code.html')
    
    imagem_qrcode = qrcode.make(string_enviada)

    # Salva a imagem em um buffer de memória
    buffer = io.BytesIO()
    imagem_qrcode.save(buffer, format='PNG')
    buffer.seek(0)

    # Cria um objeto ContentFile
    qr_code_file = ContentFile(buffer.read(), name=file_name)

    # Salva a imagem no banco de dados
    obj = QRCodeImagens.objects.create(img_qrcode=qr_code_file, tipo=tipo, string_enviada=string_enviada)
    obj.save()

    request.session['id_qrcode'] = obj.id
    request.session.save()
    
    return redirect('mostrar_qr_code')


def mostrar_qr_code(request):
    if request.session.get('id_qrcode'):
        id = request.session.get('id_qrcode')

        if QRCodeImagens.objects.filter(id=id).exists():
            obj = QRCodeImagens.objects.get(id=id)
            return render(request, 'mostrar_qr_code.html', {
                'obj': obj,
            })

    return redirect('qr_code')

