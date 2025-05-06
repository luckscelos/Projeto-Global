import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, MenuItem, Box } from '@mui/material';
import { Save, Cancel, Delete } from '@mui/icons-material';

const PessoaForm = ({ pessoa, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState({
    nome: '',
    data_nasc: '',
    cpf: '',
    sexo: 'M',
    altura: '',
    peso: '',
  });

  useEffect(() => {
    if (pessoa) {
      setFormData({
        nome: pessoa.nome,
        data_nasc: pessoa.data_nasc,
        cpf: pessoa.cpf,
        sexo: pessoa.sexo,
        altura: pessoa.altura,
        peso: pessoa.peso,
      });
    } else {
      setFormData({
        nome: '',
        data_nasc: '',
        cpf: '',
        sexo: 'M',
        altura: '',
        peso: '',
      });
    }
  }, [pessoa]);

  const formatCPF = (value) => {
    // Remove tudo que não é dígito
    const cleaned = value.replace(/\D/g, '');
    
    // Aplica a formatação do CPF (XXX.XXX.XXX-XX)
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      const formattedValue = formatCPF(value);
      setFormData({
        ...formData,
        [name]: formattedValue.replace(/\D/g, ''), // Armazena apenas dígitos
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Data de Nascimento"
            name="data_nasc"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.data_nasc}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
         <TextField
            required
            fullWidth
            label="CPF"
            name="cpf"
            value={formatCPF(formData.cpf)} // Mostra formatado
            onChange={handleChange}
            inputProps={{ maxLength: 14 }} // Tamanho considerando a formatação
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            select
            label="Sexo"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
          >
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Feminino</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Altura (m)"
            name="altura"
            type="number"
            inputProps={{ step: "0.01", min: "0.5", max: "2.5" }}
            value={formData.altura}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Peso (kg)"
            name="peso"
            type="number"
            inputProps={{ step: "0.1", min: "2", max: "300" }}
            value={formData.peso}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            {pessoa && (
              <Button
                variant="contained"
                color="error"
                startIcon={<Delete />}
                onClick={onDelete}
              >
                Excluir
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
            >
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PessoaForm;