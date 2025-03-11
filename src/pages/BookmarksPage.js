import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, TextField, Button, Paper, Divider, Chip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const BookmarksPage = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [editingBookmark, setEditingBookmark] = useState(null);
    const [newName, setNewName] = useState('');

    // Загружаем закладки из localStorage
    useEffect(() => {
        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setBookmarks(savedBookmarks);
    }, []);

    // Удаление закладки
    const handleDelete = (bookmarkId) => {
        const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        setBookmarks(updatedBookmarks);
    };

    // Переименование закладки
    const handleRename = (bookmarkId) => {
        const updatedBookmarks = bookmarks.map(bookmark =>
            bookmark.id === bookmarkId ? { ...bookmark, name: newName } : bookmark
        );
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        setBookmarks(updatedBookmarks);
        setEditingBookmark(null);
        setNewName('');
    };

    return (
        <Box sx={{ padding: 3, maxWidth: 800, margin: '0 auto' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                Закладки
            </Typography>
            <List>
                {bookmarks.map(bookmark => (
                    <Paper
                        key={bookmark.id}
                        elevation={3}
                        sx={{
                            mb: 3,
                            padding: 2,
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        <ListItem>
                            {editingBookmark === bookmark.id ? (
                                <>
                                    <TextField
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        size="small"
                                        fullWidth
                                        sx={{ mr: 2 }}
                                    />
                                    <Button onClick={() => handleRename(bookmark.id)} variant="contained">
                                        Сохранить
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {bookmark.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                {bookmark.spells.length} заклинаний
                                            </Typography>
                                        }
                                    />
                                    <IconButton onClick={() => setEditingBookmark(bookmark.id)} sx={{ mr: 1 }}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(bookmark.id)}>
                                        <Delete />
                                    </IconButton>
                                </>
                            )}
                        </ListItem>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {bookmark.spells.map((spell, index) => (
                                <Chip
                                    key={index}
                                    label={spell.name}
                                    component={Link}
                                    to={`/spell/${spell.nameEn}`}
                                    clickable
                                    sx={{ mb: 1 }}
                                />
                            ))}
                        </Box>
                        <Button
                            component={Link}
                            to={`/bookmarks/${bookmark.id}`}
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Открыть закладку
                        </Button>
                    </Paper>
                ))}
            </List>
        </Box>
    );
};

export default BookmarksPage;