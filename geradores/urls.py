from django.urls import path
from . import views

urlpatterns = [
    path('cpf/', views.gerador_cpf, name='gerador_cpf'),
    path('cnpj/', views.gerador_cnpj, name='gerador_cnpj'),
    path('senhas/', views.gerador_senhas, name='gerador_senhas'),
    path('qr_code/', views.qr_code, name='qr_code'),
    path('mostrar_qr_code/', views.mostrar_qr_code, name='mostrar_qr_code'),
]