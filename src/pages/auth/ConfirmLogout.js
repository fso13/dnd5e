import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function ConfirmLogout({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Подтверждение выхода</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы действительно хотите выйти из системы?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button
          component={RouterLink}
          to="/logout"
          color="primary"
        >
          Выйти
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmLogout;