from django.contrib import admin
from .models import QRCodeImagens

class QRCodeImagensAdmin(admin.ModelAdmin):
	list_display = ('img_qrcode', 'tipo', 'string_enviada')
	list_display_links = ('img_qrcode', 'tipo', 'string_enviada')
	list_filter = ('tipo', 'string_enviada')
	list_per_page = 20

admin.site.register(QRCodeImagens, QRCodeImagensAdmin)
