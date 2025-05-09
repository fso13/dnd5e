import React from 'react';
import { Box } from '@mui/material';
import NavBar from './components/NavBar';
import { useAuth } from './components/firebase/AuthContext';

const Layout = ({ children }) => {
  const { currentUser } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {currentUser && <NavBar />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;