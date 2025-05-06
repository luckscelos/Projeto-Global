import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  TextField,
  Typography,
  Box
} from '@mui/material';
import { Search, Edit, Add, Calculate } from '@mui/icons-material';
import { getPessoas, deletePessoa, calcularPesoIdeal } from '../services/api';
import PesoIdealModal from './PessoaModal';

const PessoaList = ({ onEdit, onCreate }) => {
  const [pessoas, setPessoas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPessoa, setSelectedPessoa] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [pesoIdeal, setPesoIdeal] = useState(0);

  useEffect(() => {
    fetchPessoas();
  }, []);

  const fetchPessoas = async (filters = {}) => {
    try {
      const response = await getPessoas(filters);
      setPessoas(response.data);
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error);
    }
  };

  const handleSearch = () => {
    fetchPessoas({ nome: searchTerm });
  };

  const handleDelete = async (id) => {
    try {
      await deletePessoa(id);
      fetchPessoas();
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error);
    }
  };

    const handleCalculatePesoIdeal = async (id) => {
    try {
      const response = await calcularPesoIdeal(id);
      setPesoIdeal(response.peso_ideal);
      setOpenModal(true);
    } catch (error) {
      console.error('Erro ao calcular peso ideal:', error);
      // Adicione feedback visual para o usuário
      alert('Erro ao calcular peso ideal. Verifique o console para detalhes.');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Pessoas
      </Typography>
      <Box sx={{ display: 'flex', mb: 2, gap: 1 }}>
        <TextField
          label="Pesquisar por nome"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={handleSearch}
        >
          Pesquisar
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={onCreate}
        >
          Nova Pessoa
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data Nasc.</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Altura</TableCell>
              <TableCell>Peso</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pessoas.map((pessoa) => (
              <TableRow key={pessoa.id}>
                <TableCell>{pessoa.nome}</TableCell>
                <TableCell>{new Date(pessoa.data_nasc).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>{pessoa.cpf}</TableCell>
                <TableCell>{pessoa.sexo === 'M' ? 'Masculino' : 'Feminino'}</TableCell>
                <TableCell>{pessoa.altura} m</TableCell>
                <TableCell>{pessoa.peso} kg</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => onEdit(pessoa)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="secondary"
                      startIcon={<Calculate />}
                      onClick={() => handleCalculatePesoIdeal(pessoa.id)}
                    >
                      Peso Ideal
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PesoIdealModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        pesoIdeal={pesoIdeal}
      />
    </Box>
  );
};

export default PessoaList;