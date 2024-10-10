from django.shortcuts import render, redirect
from .models import Post, Categoria
from django.http import Http404
from django.core.paginator import Paginator

def blog(request):
    posts = Post.objects.filter(visibilidade=True).order_by('-data_publicacao')

    qtd = len(posts) if posts else 0

    paginator = Paginator(posts, 9)
    page = request.GET.get('p', 1)
    page_obj = paginator.get_page(page)
    
    return render(request, 'blog.html', {
        'page_obj': page_obj,
        'qtd': qtd,
    })


def post(request, slug):
    if not Post.objects.get(visibilidade=True, slug=slug):
        raise Http404
    
    post = Post.objects.get(visibilidade=True, slug=slug)
    
    return render(request, 'post.html', {
        'post': post,
    })
