# Generated by Django 5.0.6 on 2024-07-23 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geradores', '0003_qrcodeimagens_tipo'),
    ]

    operations = [
        migrations.AddField(
            model_name='qrcodeimagens',
            name='string_enviada',
            field=models.CharField(default='', max_length=5000, verbose_name='Texto Enviado'),
        ),
    ]
