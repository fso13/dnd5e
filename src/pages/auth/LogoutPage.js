import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSignOut } from '../../components/firebase/firebase';
import { Box, CircularProgress, Typography } from '@mui/material';

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await handleSignOut();
        navigate('/login');
      } catch (error) {
        console.error('Logout error:', error);
        navigate('/');
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ mt: 2 }}>Logging out...</Typography>
    </Box>
  );
}

export default LogoutPage;