from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Pessoa
import json

class PessoaAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.pessoa_data = {
            'nome': 'João Silva',
            'data_nasc': '1990-01-01',
            'cpf': '12345678901',
            'sexo': 'M',
            'altura': 1.75,
            'peso': 70.5
        }
        self.pessoa = Pessoa.objects.create(**self.pessoa_data)

    def test_criar_pessoa(self):
        url = reverse('pessoas')
        data = {
            'nome': 'Maria Oliveira',
            'data_nasc': '1995-05-15',
            'cpf': '98765432109',
            'sexo': 'F',
            'altura': 1.65,
            'peso': 58.0
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Pessoa.objects.count(), 2)

    def test_listar_pessoas(self):
        url = reverse('pessoas')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_obter_pessoa(self):
        url = reverse('pessoa-detail', args=[self.pessoa.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], self.pessoa_data['nome'])
    def test_atualizar_pessoa(self):
        url = reverse('pessoa-detail', args=[self.pessoa.id])
        data = {
        'nome': 'João Silva Atualizado',
        'data_nasc': '1990-01-01',  # Mantém os mesmos dados obrigatórios
        'cpf': '12345678901',
        'sexo': 'M',
        'altura': 1.75,
        'peso': 70.5
    }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.pessoa.refresh_from_db()
        self.assertEqual(self.pessoa.nome, 'João Silva Atualizado')
    def test_deletar_pessoa(self):
        url = reverse('pessoa-detail', args=[self.pessoa.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Pessoa.objects.count(), 0)

    def test_calcular_peso_ideal(self):
        url = reverse('peso-ideal', args=[self.pessoa.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Cálculo esperado para homem com 1.75m: (72.7 * 1.75) - 58 = 69.225
        self.assertAlmostEqual(response.data['peso_ideal'], 69.23, places=2)