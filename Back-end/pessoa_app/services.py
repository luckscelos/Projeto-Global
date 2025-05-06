from .models import Pessoa
from .serializers import PessoaSerializer
from .tasks import *

class PessoaService:
    @staticmethod
    def incluir_pessoa(pessoa_dto):
        serializer = PessoaSerializer(data=pessoa_dto)
        if serializer.is_valid():
            pessoa = serializer.save()
            return {'success': True, 'pessoa': PessoaSerializer(pessoa).data}
        return {'success': False, 'errors': serializer.errors}
    
    @staticmethod
    def alterar_pessoa(pessoa_id, pessoa_dto):
        try:
            pessoa = Pessoa.objects.get(id=pessoa_id)
        except Pessoa.DoesNotExist:
            return {'success': False, 'error': 'Pessoa não encontrada'}
        
        serializer = PessoaSerializer(pessoa, data=pessoa_dto)
        if serializer.is_valid():
            pessoa = serializer.save()
            return {'success': True, 'pessoa': PessoaSerializer(pessoa).data}
        return {'success': False, 'errors': serializer.errors}
    
    @staticmethod
    def excluir_pessoa(pessoa_id):
        try:
            pessoa = Pessoa.objects.get(id=pessoa_id)
            pessoa.delete()
            return {'success': True}
        except Pessoa.DoesNotExist:
            return {'success': False, 'error': 'Pessoa não encontrada'}
    
    @staticmethod
    def pesquisar_pessoa(filtros):
        pessoas = Pessoa.objects.all()
        
        if 'nome' in filtros:
            pessoas = pessoas.filter(nome__icontains=filtros['nome'])
        if 'cpf' in filtros:
            pessoas = pessoas.filter(cpf=filtros['cpf'])
        
        serializer = PessoaSerializer(pessoas, many=True)
        return {'success': True, 'pessoas': serializer.data}
    
    @staticmethod
    def calcular_peso_ideal(pessoa_id):
        try:
            pessoa = Pessoa.objects.get(id=pessoa_id)
            peso_ideal = pessoa.calcular_peso_ideal()
            return {'success': True, 'peso_ideal': peso_ideal}
        except Pessoa.DoesNotExist:
            return {'success': False, 'error': 'Pessoa não encontrada'}