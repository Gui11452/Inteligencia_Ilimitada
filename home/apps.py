from django.apps import AppConfig


class HomeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'home'

    def ready(self, *args, **kwargs) -> None:
        import home.signals
        super_ready = super().ready()
        return super_ready