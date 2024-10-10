from django.shortcuts import render, redirect
from .models import RemoverFundo
from rembg import remove
from PIL import Image
import os
from django.core.files import File
import tempfile
from inteligencia.settings import API_KEY
import requests, json
from django.core.paginator import Paginator
from blog.models import Post, Categoria
from django.contrib import messages
from django.http import JsonResponse
from .utils import check_website_safety

def home(request):
    posts = Post.objects.filter(visibilidade=True).order_by('-data_publicacao')
    posts = posts[:9]

    """ qtd = len(posts) if posts else 0 """

    """ paginator = Paginator(posts, 10)
    page = request.GET.get('p', 1)
    page_obj = paginator.get_page(page) """

    return render(request, 'index.html', {
        'posts': posts,
        # 'qtd': qtd,
    })


def sobre(request):
    return render(request, 'about.html')


def not_found(request, exception):
    return render(request, 'not_found.html')


def calculadora_dias_uteis(request):
    return render(request, 'calculadora_dias_uteis.html')

def politica_privacidade(request):
    return render(request, 'politica_privacidade.html')

def politica_cookies(request):
    return render(request, 'politica_cookies.html')


def calculadora_financeira(request):
    return render(request, 'calculadora_financeira.html')

def calculadora_cientifica(request):
    return render(request, 'calculadora_cientifica.html')


def removedor_fundo(request):
    if request.method != 'POST':
        return render(request, 'removedor_fundo.html')
    
    file_before = request.FILES.get('file_before')

    if not file_before:
        return render(request, 'removedor_fundo.html')
    
    img = RemoverFundo.objects.create(img_before=file_before)
    img.save()

    caminho_relativo, nome_arquivo = os.path.split(img.img_before.path)

    input_path = img.img_before.path
    output_path = os.path.join(caminho_relativo, f'{nome_arquivo}_sem_bg.png')

    # Processa a imagem e salva sem o fundo
    input = Image.open(input_path)
    output = remove(input)
    
    # Cria um arquivo temporário para salvar a imagem processada
    with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_file:
        output.save(temp_file.name)
    
    # Abre o arquivo temporário como um objeto File do Django
    with open(temp_file.name, 'rb') as f:
        django_file = File(f)
        img.img_after.save(f'{nome_arquivo}_sem_bg.png', django_file, save=True)
    
    # Remove o arquivo temporário
    os.remove(temp_file.name)

    request.session['id_remover_fundo'] = img.id
    request.session.save()

    return redirect('baixar_imagem_sem_fundo')


def baixar_imagem_sem_fundo(request):
    if request.session.get('id_remover_fundo'):
        id = request.session.get('id_remover_fundo')

        img = RemoverFundo.objects.get(id=id)

        if img.img_before and img.img_after:
            return render(request, 'baixar_imagem_sem_fundo.html', {
                'img': img,
            })
        else:
            return redirect('removedor_fundo')

    else:
        return redirect('removedor_fundo')
    

def resumir_texto(request):
    if request.method != 'POST':
        return render(request, 'resumir_texto.html')
    
    tipo_resumo = request.POST.get('tipo_resumo')
    modo_escrita = request.POST.get('modo_escrita')
    texto_antes = request.POST.get('texto_antes')

    if not tipo_resumo or not modo_escrita or not texto_antes:
        messages.error(request, 'O campo do texto NÃO pode ficar vazio')
        return render(request, 'resumir_texto.html')
    
    headers = {'Authorization': f'Bearer {API_KEY}', 'Content-Type': 'application/json'}
    link = 'https://api.openai.com/v1/chat/completions'
    id_modelo = 'gpt-3.5-turbo'

    body_mensagem = {
        'model': id_modelo,
        'messages': [{'role': 'user', 'content': f"""
                      Quero que você resuma um texto com as seguintes características. OBS: quero que você retorne SÓ O TEXTO, E MAIS NADA ALÉM DISSO.
                      - Tipo de resumo: {tipo_resumo}
                      - Modo de escrita: {modo_escrita}
                      - Texto que será resumido: {texto_antes}
                      """}]
    }

    body_mensagem = json.dumps(body_mensagem)
    requisicao = requests.post(link, headers=headers, data=body_mensagem).json()
    resultado = requisicao['choices'][0]['message']['content']

    messages.success(request, 'Texto resumido com sucesso!')
    return render(request, 'resumir_texto.html', {
        'texto_antes': texto_antes,
        'resultado': resultado,
    })


def reescrever_texto(request):
    if request.method != 'POST':
        return render(request, 'reescrever_texto.html')
    
    tipo_reescrita = request.POST.get('tipo_reescrita')
    modo_escrita = request.POST.get('modo_escrita')
    texto_antes = request.POST.get('texto_antes')

    if not tipo_reescrita or not modo_escrita or not texto_antes:
        messages.error(request, 'O campo do texto NÃO pode ficar vazio')
        return render(request, 'reescrever_texto.html')
    
    headers = {'Authorization': f'Bearer {API_KEY}', 'Content-Type': 'application/json'}
    link = 'https://api.openai.com/v1/chat/completions'
    id_modelo = 'gpt-3.5-turbo'

    body_mensagem = {
        'model': id_modelo,
        'messages': [{'role': 'user', 'content': f"""
                      Quero que você reescreva um texto com as seguintes características. OBS: quero que você retorne SÓ O TEXTO, E MAIS NADA ALÉM DISSO.
                      - Tipo de reescrita: {tipo_reescrita}
                      - Modo de escrita: {modo_escrita}
                      - Texto que será reescrito: {texto_antes}
                      """}]
    }

    body_mensagem = json.dumps(body_mensagem)
    requisicao = requests.post(link, headers=headers, data=body_mensagem).json()
    resultado = requisicao['choices'][0]['message']['content']

    messages.success(request, 'Texto reescrito com sucesso!')
    return render(request, 'reescrever_texto.html', {
        'texto_antes': texto_antes,
        'resultado': resultado,
    })


def criar_texto(request):
    if request.method != 'POST':
        return render(request, 'criar_texto.html')
    
    tipo_texto = request.POST.get('tipo_texto')
    modo_escrita = request.POST.get('modo_escrita')
    texto_antes = request.POST.get('texto_antes')

    if not tipo_texto or not modo_escrita or not texto_antes:
        messages.error(request, 'O campo do texto NÃO pode ficar vazio')
        return render(request, 'criar_texto.html')
    
    headers = {'Authorization': f'Bearer {API_KEY}', 'Content-Type': 'application/json'}
    link = 'https://api.openai.com/v1/chat/completions'
    id_modelo = 'gpt-3.5-turbo'

    body_mensagem = {
        'model': id_modelo,
        'messages': [{'role': 'user', 'content': f"""
                      Quero que você reescreva um texto com as seguintes características. OBS: quero que você retorne SÓ O TEXTO, E MAIS NADA ALÉM DISSO.
                      - Tipo de texto: {tipo_texto}
                      - Modo de escrita: {modo_escrita}
                      - Instruções para a criação do texto: {texto_antes}
                      """}]
    }

    body_mensagem = json.dumps(body_mensagem)
    requisicao = requests.post(link, headers=headers, data=body_mensagem).json()
    resultado = requisicao['choices'][0]['message']['content']

    messages.success(request, 'Texto criado com sucesso!')
    return render(request, 'criar_texto.html', {
        'texto_antes': texto_antes,
        'resultado': resultado,
    })


def calculadora_calorias(request):
    return render(request, 'calculadora_calorias.html')


def peso_ideal(request):
    return render(request, 'peso_ideal.html')


def consulta_site(request):
    return render(request, 'consulta_site.html')

def verificar_link(request):
    # print(request.GET)
    url = request.GET.get('url')
    if url:
        response = check_website_safety(url)
        return JsonResponse(response)
    else:
        return JsonResponse({'error': 'invalid url'})