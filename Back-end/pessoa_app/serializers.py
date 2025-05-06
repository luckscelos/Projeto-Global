from rest_framework import serializers
from .models import Pessoa

class PessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = ['id', 'nome', 'data_nasc', 'cpf', 'sexo', 'altura', 'peso']
    
    def validate_cpf(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("CPF deve conter apenas números")
        if len(value) != 11:
            raise serializers.ValidationError("CPF deve ter 11 dígitos")
        return value
    
    def validate_altura(self, value):
        if value < 0.5 or value > 2.5:
            raise serializers.ValidationError("Altura deve estar entre 0.5m e 2.5m")
        return value
    
    def validate_peso(self, value):
        if value < 2 or value > 300:
            raise serializers.ValidationError("Peso deve estar entre 2kg e 300kg")
        return value
    
class PesoIdealSerializer(serializers.Serializer):
    peso_ideal = serializers.FloatField()