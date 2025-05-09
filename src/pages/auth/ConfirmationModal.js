import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ConfirmationModal = ({ open, onClose, onConfirm, message }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {message}
                </Typography>
                <Button onClick={onConfirm} variant="contained" color="error" sx={{ mr: 2 }}>
                    Да
                </Button>
                <Button onClick={onClose} variant="outlined">
                    Нет
                </Button>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;