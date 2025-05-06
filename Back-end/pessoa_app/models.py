from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Pessoa(models.Model):
    SEXO_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Feminino'),
    ]
    
    nome = models.CharField(max_length=100)
    data_nasc = models.DateField()
    cpf = models.CharField(max_length=14, unique=True)
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES)
    altura = models.FloatField(validators=[MinValueValidator(0.5), MaxValueValidator(2.5)])
    peso = models.FloatField(validators=[MinValueValidator(2), MaxValueValidator(300)])
    
    def calcular_peso_ideal(self):
        
        if not hasattr(self, 'altura') or not hasattr(self, 'sexo'):
            raise ValueError("Altura e sexo são necessários para o cálculo")
        
    
        try:
            altura = float(self.altura)
            sexo = str(self.sexo).upper()
        except (TypeError, ValueError) as e:
            raise ValueError(f"Dados inválidos para cálculo: {str(e)}")
        
    
        if altura < 0.5 or altura > 2.5:
            raise ValueError("Altura deve estar entre 0.5m e 2.5m")
        
        if sexo not in ['M', 'F']:
            raise ValueError("Sexo deve ser 'M' ou 'F'")
        
    
        try:
            if sexo == 'M':
                peso_ideal = (72.7 * altura) - 58
            else:
                peso_ideal = (62.1 * altura) - 44.7
            
            return round(peso_ideal, 2)
        
        except Exception as e:
            raise ValueError(f"Erro inesperado no cálculo: {str(e)}")