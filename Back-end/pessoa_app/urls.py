from django.urls import path
from .views import PessoaAPIView, PesoIdealAPIView

urlpatterns = [
    path('api/pessoas/', PessoaAPIView.as_view(), name='pessoas'),
    path('api/pessoas/<int:pessoa_id>/', PessoaAPIView.as_view(), name='pessoa-detail'),
    path('api/pessoas/<int:pessoa_id>/peso-ideal/', PesoIdealAPIView.as_view(), name='peso-ideal'),
]