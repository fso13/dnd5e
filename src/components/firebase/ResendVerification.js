import React from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from './firebase';
import { Button, Alert, Box } from '@mui/material';

function ResendVerification() {
  const user = auth.currentUser;

  const handleResend = async () => {
    try {
      await sendEmailVerification(user);
      alert('Письмо с подтверждением отправлено повторно!');
    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Alert severity="info">
        Не получили письмо?
        <Button
          color="primary"
          size="small"
          onClick={handleResend}
          sx={{ ml: 1 }}
        >
          Отправить повторно
        </Button>
      </Alert>
    </Box>
  );
}

export default ResendVerification;