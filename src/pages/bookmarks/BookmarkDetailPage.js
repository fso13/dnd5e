import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Box, Typography, IconButton, Divider, Button, Modal, TextField, Grid2 } from '@mui/material';
import SpellCard from '../../components/spells/SpellCard';
import MonsterCard from '../../components/monsters/MonsterCard';
const BookmarkDetailPage = ({ bookmarks, removeSpellFromBookmark, removeBookmark, removeMonsterFromBookmark, renameBookmark, addSpellToBookmark, addBookmark, addMonsterToBookmark }) => {
    const { bookmarkId } = useParams();
    const bookmark = bookmarks.find(bookmark => bookmark.id === parseInt(bookmarkId));
    const [renameModalOpen, setRenameModalOpen] = useState(false);
    const [newName, setNewName] = useState('');

    if (!bookmark) {
        return <Typography variant="h4">Закладка не найдена</Typography>;
    }

    const handleRename = () => {
        renameBookmark(bookmark.id, newName);
        setRenameModalOpen(false);
    };

    return (
        <Box sx={{ padding: 3 }}>

            <Grid2 sx={{ order: { xs: 2, sm: 1 } }}>
                <Typography variant="h4">{bookmark.name}</Typography>
            </Grid2>
            <Grid2 container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
                <Grid2>
                    <IconButton onClick={() => setRenameModalOpen(true)}>
                        <Edit />
                    </IconButton>
                </Grid2>
                <Grid2>
                    <IconButton onClick={() => removeBookmark(bookmark.id)} >
                        <Delete />
                    </IconButton>
                </Grid2>
            </Grid2>


            {/* Модальное окно для переименования */}
            <Modal open={renameModalOpen} onClose={() => setRenameModalOpen(false)}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6">Переименовать закладку</Typography>
                    <TextField
                        fullWidth
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        label="Новое название"
                        sx={{ mt: 2 }}
                    />
                    <Button onClick={handleRename} variant="contained" sx={{ mt: 2 }}>
                        Сохранить
                    </Button>
                </Box>
            </Modal>


            <Grid2 container spacing={3} justifyContent="center">
                {bookmark.spells.map((spell, index) => {
                    return <SpellCard spell={spell} index={index} bookmarks={bookmarks} removeSpellFromBookmark={removeSpellFromBookmark} addBookmark={addBookmark} addSpellToBookmark={addSpellToBookmark} />
                })}
            </Grid2>
            {/* Отображение монстров */}
            <Divider sx={{ my: 3 }} />

            <Grid2 container spacing={3} justifyContent="center">
                {bookmark.monsters.map((monster, index) => {
                    return <MonsterCard monster={monster} index={index} bookmarks={bookmarks} addMonsterToBookmark={addMonsterToBookmark} addBookmark={addBookmark} removeMonsterFromBookmark={removeMonsterFromBookmark} />
                })}
            </Grid2>
        </Box>
    );
};

export default BookmarkDetailPage;