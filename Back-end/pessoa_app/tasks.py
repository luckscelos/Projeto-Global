from .models import Pessoa
from .services import PessoaService

class PessoaTask:
    @staticmethod
    def incluir_pessoa(pessoa_dto):
        return PessoaService.incluir_pessoa(pessoa_dto)
    
    @staticmethod
    def alterar_pessoa(pessoa_id, pessoa_dto):
        return PessoaService.alterar_pessoa(pessoa_id, pessoa_dto)
    
    @staticmethod
    def excluir_pessoa(pessoa_id):
        return PessoaService.excluir_pessoa(pessoa_id)
    
    @staticmethod
    def pesquisar_pessoa(filtros):
        return PessoaService.pesquisar_pessoa(filtros)
    
    @staticmethod
    def calcular_peso_ideal(pessoa_id):
        return PessoaService.calcular_peso_ideal(pessoa_id)