from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete, pre_delete
from django.dispatch import receiver
from .models import RemoverFundo
import os

@receiver(pre_delete, sender=RemoverFundo)
def remover_fundo_imagens_pre_delete(sender, instance, *args, **kwargs):
    instancia = RemoverFundo.objects.get(id=instance.id)
    img_before = instancia.img_before.path
    img_after = instancia.img_after.path

    os.remove(img_before)
    os.remove(img_after)