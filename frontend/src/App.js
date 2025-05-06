import React, { useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import PessoaList from './components/PessoaList';
import PessoaForm from './components/PessoaForm';
import { createPessoa, updatePessoa, deletePessoa,  } from './services/api';

function App() {
  const [editMode, setEditMode] = useState(false);
  const [currentPessoa, setCurrentPessoa] = useState(null);

  const handleCreate = () => {
    setCurrentPessoa(null);
    setEditMode(true);
  };

  const handleEdit = (pessoa) => {
    setCurrentPessoa(pessoa);
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setCurrentPessoa(null);
  };

  const handleSave = async (formData) => {
    try {
      if (currentPessoa) {
        await updatePessoa(currentPessoa.id, formData);
      } else {
        await createPessoa(formData);
      }
      setEditMode(false);
      setCurrentPessoa(null);
    } catch (error) {
      console.error('Erro ao salvar pessoa:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (currentPessoa) {
        await deletePessoa(currentPessoa.id);
        setEditMode(false);
        setCurrentPessoa(null);
      }
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      {editMode ? (
        <PessoaForm
          pessoa={currentPessoa}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      ) : (
        <PessoaList
          onEdit={handleEdit}
          onCreate={handleCreate}
        />
      )}
    </Container>
  );
}

export default App;