import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const PesoIdealModal = ({ open, onClose, pesoIdeal }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Peso Ideal Calculado
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          O peso ideal é: <strong>{pesoIdeal} kg</strong>
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={onClose}>
            Fechar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PesoIdealModal;