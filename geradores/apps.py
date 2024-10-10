from django.apps import AppConfig


class GeradoresConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'geradores'

    def ready(self, *args, **kwargs) -> None:
        import geradores.signals
        super_ready = super().ready()
        return super_ready
