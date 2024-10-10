from django.contrib import admin
from .models import RemoverFundo

class RemoverFundoAdmin(admin.ModelAdmin):
	list_display = ('img_before', 'img_after')
	list_display_links = ('img_before', 'img_after')
	list_per_page = 20

admin.site.register(RemoverFundo, RemoverFundoAdmin)

