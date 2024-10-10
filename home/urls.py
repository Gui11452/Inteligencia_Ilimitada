from django.urls import path, re_path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    re_path(r'^ads.txt$', TemplateView.as_view(template_name='ads.txt', content_type='text/plain')),

    path('', views.home, name='home'),
    path('sobre/', views.sobre, name='sobre'),

    path('calculadora_dias_uteis/', views.calculadora_dias_uteis, name='calculadora_dias_uteis'),

    path('politica_privacidade/', views.politica_privacidade, name='politica_privacidade'),
    path('politica_cookies/', views.politica_cookies, name='politica_cookies'),

    path('calculadora_financeira/', views.calculadora_financeira, name='calculadora_financeira'),
    path('calculadora_cientifica/', views.calculadora_cientifica, name='calculadora_cientifica'),

    path('removedor_fundo/', views.removedor_fundo, name='removedor_fundo'),
    path('baixar_imagem_sem_fundo/', views.baixar_imagem_sem_fundo, name='baixar_imagem_sem_fundo'),

    path('resumir_texto/', views.resumir_texto, name='resumir_texto'),
    path('reescrever_texto/', views.reescrever_texto, name='reescrever_texto'),
    path('criar_texto/', views.criar_texto, name='criar_texto'),

    path('peso_ideal/', views.peso_ideal, name='peso_ideal'),
    path('calculadora_calorias/', views.calculadora_calorias, name='calculadora_calorias'),

    path('consulta_site/', views.consulta_site, name='consulta_site'),

    path('verificar_link/', views.verificar_link, name='verificar_link'),
]