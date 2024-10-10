from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete, pre_delete
from django.dispatch import receiver
from .models import QRCodeImagens
import os

@receiver(pre_delete, sender=QRCodeImagens)
def remover_qrcode_imagens_pre_delete(sender, instance, *args, **kwargs):
    instancia = QRCodeImagens.objects.get(id=instance.id)
    img_qrcode = instancia.img_qrcode.path

    os.remove(img_qrcode)