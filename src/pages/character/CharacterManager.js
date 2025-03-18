import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid2, Paper, IconButton, Chip, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal'; // Импортируем компонент
import { useSnackbar } from 'notistack';
import {getSchoolColor} from '../../components/spells/SpellUtils'

const CharacterManager = () => {
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();
    const [characterToDelete, setCharacterToDelete] = useState(null); // Закладка, которую нужно удалить
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Состояние для модального окна удаления
    const { enqueueSnackbar } = useSnackbar(); // Хук для уведомлений
    // Обработчик открытия модального окна удаления
    const handleDeleteClick = (id) => {
        setCharacterToDelete(id);
        setDeleteModalOpen(true);
    };

    // Обработчик подтверждения удаления
    const handleConfirmDelete = () => {
        if (characterToDelete) {
            deleteCharacter(characterToDelete); // Удаляем закладку
            setDeleteModalOpen(false); // Закрываем модальное окно
            setCharacterToDelete(null); // Сбрасываем состояние

            enqueueSnackbar(`Персонаж удален`, { variant: 'error' });
        }
    };

    // Загрузка данных из localStorage
    useEffect(() => {
        const savedCharacters = localStorage.getItem('dndCharacters');
        if (savedCharacters) {
            setCharacters(JSON.parse(savedCharacters));
        }
    }, []);

    // Сохранение данных в localStorage
    const saveCharacters = (updatedCharacters) => {
        localStorage.setItem('dndCharacters', JSON.stringify(updatedCharacters));
    };

    // Добавление нового персонажа
    const addCharacter = () => {
        const newCharacter = {
            id: Date.now(),
            name: 'Новый персонаж',
            race: '',
            class: '',
            level: '',
            stats: {
                strength: '',
                dexterity: '',
                constitution: '',
                intelligence: '',
                wisdom: '',
                charisma: '',
            },
            proficiencyBonus: '',
            skills: '',
            spells: [],
            inventory: '',
            description: '',
        };
        const updatedCharacters = [...characters, newCharacter];
        setCharacters(updatedCharacters);
        saveCharacters(updatedCharacters);

        enqueueSnackbar(`Персонаж "${updatedCharacters.name}" создан`, { variant: 'success' });
    };

    // Удаление персонажа
    const deleteCharacter = (id) => {
        const updatedCharacters = characters.filter(character => character.id !== id);
        setCharacters(updatedCharacters);
        saveCharacters(updatedCharacters);
    };

    // Обработчик клика по карточке
    const handleSpellClick = (name) => {
        navigate(`/spells/${name}`);
    };



    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Управление персонажами D&D 5e
            </Typography>

            <Paper elevation={3} sx={{ padding: 3 }}>
                <Button variant="contained" color="primary" onClick={addCharacter} sx={{ mb: 3 }}>
                    Создать нового персонажа
                </Button>

                <Grid2 container spacing={3}>
                    {characters.map((character) => (
                        <Paper

                            key={character.id}
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
                            <Box spacing={5}>
                                <Box spacing={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {character.name}
                                    </Typography>
                                    <IconButton spacing={2} edge="end" onClick={() => navigate(`/character-sheet/${character.id}`)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton spacing={2} edge="end" onClick={() => handleDeleteClick(character.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {character.level}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {character.class}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {character.race}
                                </Typography>

                                <Divider sx={{ my: 2 }} />
                                <Box spacing={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {character.spells.map((spell, index) => (
                                        <Chip
                                            color={getSchoolColor(spell)}
                                            key={spell}
                                            label={spell}
                                            onClick={() => handleSpellClick(spell)}
                                            sx={{ mb: 1 }}
                                        />
                                    ))}
                                </Box>

                            </Box>
                        </Paper>
                    ))}
                </Grid2>
            </Paper>

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

export default CharacterManager;