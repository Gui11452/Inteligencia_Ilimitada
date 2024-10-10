# Generated by Django 5.0.6 on 2024-07-16 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RemoverFundo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img_before', models.ImageField(upload_to='removedor_fundo/%Y/%m/%d')),
                ('img_after', models.ImageField(blank=True, null=True, upload_to='removedor_fundo/%Y/%m/%d')),
            ],
            options={
                'verbose_name': 'Remover Fundo',
                'verbose_name_plural': 'Remover Fundos',
            },
        ),
    ]
