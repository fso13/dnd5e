import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const BookmarkModal = ({ open, onClose, onAddToBookmark, spell }) => {
    const [bookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks')) || []);
    const [selectedBookmark, setSelectedBookmark] = useState('');
    const [newBookmarkName, setNewBookmarkName] = useState('');

    const handleAdd = () => {
        if (selectedBookmark) {
            // Добавляем заклинание в существующую закладку
            const updatedBookmarks = bookmarks.map(bookmark =>
                bookmark.id === selectedBookmark
                    ? { ...bookmark, spells: [...bookmark.spells, spell] }
                    : bookmark
            );
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        } else {
            // Создаем новую закладку
            const newBookmark = {
                id: Date.now(),
                name: newBookmarkName,
                spells: [spell],
            };
            localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, newBookmark]));
        }
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h6">Добавить в закладку</Typography>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Выберите закладку</InputLabel>
                    <Select
                        value={selectedBookmark}
                        onChange={(e) => setSelectedBookmark(e.target.value)}
                    >
                        {bookmarks.map(bookmark => (
                            <MenuItem key={bookmark.id} value={bookmark.id}>
                                {bookmark.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography variant="body2" sx={{ mt: 2 }}>Или создайте новую:</Typography>
                <TextField
                    fullWidth
                    label="Название закладки"
                    value={newBookmarkName}
                    onChange={(e) => setNewBookmarkName(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Button onClick={handleAdd} variant="contained" sx={{ mt: 2 }}>
                    Добавить
                </Button>
            </Box>
        </Modal>
    );
};

export default BookmarkModal;