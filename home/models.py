from django.db import models

class RemoverFundo(models.Model):
    img_before = models.ImageField(upload_to='removedor_fundo/%Y/%m/%d')
    img_after = models.ImageField(upload_to='removedor_fundo/%Y/%m/%d', blank=True, null=True)

    class Meta:
        verbose_name = 'Remover Fundo'
        verbose_name_plural = 'Remover Fundos'

    def __str__(self):
        return f'{self.id}'
