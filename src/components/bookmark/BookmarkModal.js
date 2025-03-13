import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const BookmarkModal = ({ open, onClose, bookmarks = [], onAddToBookmark, addBookmark }) => {
    const [selectedBookmark, setSelectedBookmark] = useState('');
    const [newBookmarkName, setNewBookmarkName] = useState('');
    const [isCreatingNew, setIsCreatingNew] = useState(false); // Режим создания новой закладки

    // Обработчик добавления в закладку
    const handleAdd = () => {
        if (selectedBookmark) {
            onAddToBookmark(selectedBookmark);
            onClose();
        }
    };

    // Обработчик создания новой закладки
    const handleCreateBookmark = () => {
        if (newBookmarkName) {
            addBookmark(newBookmarkName); // Создаём новую закладку
            setNewBookmarkName(''); // Очищаем поле ввода
            setIsCreatingNew(false); // Возвращаемся к выбору закладки
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h6">Добавить в закладку</Typography>

                {/* Режим выбора закладки */}
                {!isCreatingNew && (
                    <>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Выберите закладку</InputLabel>
                            <Select
                                value={selectedBookmark}
                                onChange={(e) => setSelectedBookmark(e.target.value)}
                                label="Выберите закладку"
                            >
                                {bookmarks.map(bookmark => (
                                    <MenuItem key={bookmark.id} value={bookmark.id}>
                                        {bookmark.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button onClick={handleAdd} variant="contained" sx={{ mt: 2 }}>
                            Добавить
                        </Button>
                        <Button onClick={() => setIsCreatingNew(true)} variant="outlined" sx={{ mt: 2, ml: 2 }}>
                            Создать новую закладку
                        </Button>
                    </>
                )}

                {/* Режим создания новой закладки */}
                {isCreatingNew && (
                    <>
                        <TextField
                            fullWidth
                            value={newBookmarkName}
                            onChange={(e) => setNewBookmarkName(e.target.value)}
                            label="Название новой закладки"
                            sx={{ mt: 2 }}
                        />
                        <Button onClick={handleCreateBookmark} variant="contained" sx={{ mt: 2 }}>
                            Создать
                        </Button>
                        <Button onClick={() => setIsCreatingNew(false)} variant="outlined" sx={{ mt: 2, ml: 2 }}>
                            Назад
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default BookmarkModal;