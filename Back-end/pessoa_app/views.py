from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Pessoa
from .serializers import PessoaSerializer

class PessoaAPIView(APIView):
    def post(self, request):
        """Incluir nova pessoa"""
        serializer = PessoaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        """Pesquisar pessoas (com filtros opcionais)"""
        nome = request.query_params.get('nome', '')
        pessoas = Pessoa.objects.filter(nome__icontains=nome)
        serializer = PessoaSerializer(pessoas, many=True)
        return Response(serializer.data)

    def put(self, request, pessoa_id):
        """Alterar pessoa existente"""
        try:
            pessoa = Pessoa.objects.get(pk=pessoa_id)
            serializer = PessoaSerializer(pessoa, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Pessoa.DoesNotExist:
            return Response({'error': 'Pessoa não encontrada'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pessoa_id):
        """Excluir pessoa"""
        try:
            pessoa = Pessoa.objects.get(pk=pessoa_id)
            pessoa.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Pessoa.DoesNotExist:
            return Response({'error': 'Pessoa não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        
        
class PesoIdealAPIView(APIView):
    def get(self, request, pessoa_id):
        try:
            pessoa = Pessoa.objects.get(id=pessoa_id)
            peso_ideal = pessoa.calcular_peso_ideal()
            return Response({'peso_ideal': peso_ideal}, status=status.HTTP_200_OK)
        except Pessoa.DoesNotExist:
            return Response({'error': 'Pessoa não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)