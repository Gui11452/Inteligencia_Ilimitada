# Generated by Django 5.0.6 on 2024-07-24 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geradores', '0004_qrcodeimagens_string_enviada'),
    ]

    operations = [
        migrations.AlterField(
            model_name='qrcodeimagens',
            name='img_qrcode',
            field=models.ImageField(upload_to='qr_code/%Y/%m/%d', verbose_name='Imagem'),
        ),
    ]
