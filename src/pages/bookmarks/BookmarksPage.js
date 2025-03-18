import React, { useState } from 'react';
import { Box, Typography, Grid2, IconButton, TextField, Button, Paper, Divider, Chip, Modal } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal'; // Импортируем компонент
import {getSchoolColor} from '../../components/spells/SpellUtils'
import {getTypeColor} from '../../components/monsters//MonsterUtils'


const BookmarksPage = ({ bookmarks, removeBookmark, removeSpellFromBookmark, removeMonsterFromBookmark, renameBookmark }) => {
    const [renameModalOpen, setRenameModalOpen] = useState(false);
    const [currentBookmarkId, setCurrentBookmarkId] = useState(null);
    const [newName, setNewName] = useState('');
    const navigate = useNavigate();
    const [bookmarkToDelete, setBookmarkToDelete] = useState(null); // Закладка, которую нужно удалить
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Состояние для модального окна удаления

    // Обработчик открытия модального окна удаления
    const handleDeleteClick = (bookmarkId) => {
        setBookmarkToDelete(bookmarkId);
        setDeleteModalOpen(true);
    };

    // Обработчик подтверждения удаления
    const handleConfirmDelete = () => {
        if (bookmarkToDelete) {
            removeBookmark(bookmarkToDelete); // Удаляем закладку
            setDeleteModalOpen(false); // Закрываем модальное окно
            setBookmarkToDelete(null); // Сбрасываем состояние
        }
    };


    // Обработчик клика по карточке
    const handleSpellClick = (name) => {
        navigate(`/spells/${name}`);
    };
    // Обработчик клика по карточке
    const handleMonsterClick = (name) => {
        navigate(`/bestiary/${name}`);
    };

    // Обработчик открытия модального окна для переименования
    const handleRenameClick = (bookmarkId) => {
        setCurrentBookmarkId(bookmarkId);
        setRenameModalOpen(true);
    };

    // Обработчик переименования закладки
    const handleRename = () => {
        if (currentBookmarkId && newName) {
            renameBookmark(currentBookmarkId, newName);
            setRenameModalOpen(false);
            setNewName('');
        }
    };
    return (
        <Box sx={{ padding: 3, margin: '0 auto' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                Закладки
            </Typography>
            <Grid2 container spacing={3}>
                {bookmarks.map(bookmark => (
                    <Paper
                        key={bookmark.id}
                        elevation={3}
                        sx={{
                            maxWidth: 400,
                            mb: 3,
                            padding: 2,
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        <Box>

                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {bookmark.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {bookmark.spells.length} заклинаний
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {bookmark.monsters.length} монстров
                            </Typography>
                            <IconButton onClick={() => handleRenameClick(bookmark.id)} color="primary">
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteClick(bookmark.id)}>
                                <Delete />
                            </IconButton>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {bookmark.spells.map((spell, index) => (
                                <Chip
                                    color={getSchoolColor(spell.school)}
                                    key={spell.name.rus}
                                    label={spell.name.rus}
                                    onClick={() => handleSpellClick(spell.name.rus)}
                                    sx={{ mb: 1 }}
                                    onDelete={() => removeSpellFromBookmark(bookmark.id, spell.name.rus)}
                                />
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {bookmark.monsters.map((monster, index) => (
                                <Chip
                                    color={getTypeColor(monster.type)}
                                    key={monster.name}
                                    label={monster.name}
                                    sx={{ mb: 1 }}
                                    onClick={() => handleMonsterClick(monster.name)}
                                    onDelete={() => removeMonsterFromBookmark(bookmark.id, monster.name)}
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


            {/* Модальное окно подтверждения удаления */}
            <ConfirmationModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message="Вы уверены, что хотите удалить эту закладку?"
            />
        </Box>
    );
};

export default BookmarksPage;