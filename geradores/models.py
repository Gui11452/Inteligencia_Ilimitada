from django.db import models

class QRCodeImagens(models.Model):
    img_qrcode = models.ImageField(upload_to='qr_code/%Y/%m/%d', verbose_name='Imagem')
    tipo = models.CharField(
        default='Link',
        max_length=255, 
        verbose_name="Tipo", 
        choices=[
            ("Link", "Link"),
            ("Whatsapp", "Whatsapp"),
            ("Email", "Email"),
            ("Sms", "Sms"),
            ("Pix", "Pix"),
            ("Wifi", "Wifi"),
        ],
    )
    string_enviada = models.CharField(default='', max_length=5000, verbose_name='Texto Enviado')

    class Meta:
        verbose_name = 'QR CODE Imagem'
        verbose_name_plural = 'QR CODE Imagens'

    def __str__(self):
        return f'{self.string_enviada}'
