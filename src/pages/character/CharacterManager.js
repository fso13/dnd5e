import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid2, Paper, IconButton, Chip, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const CharacterManager = () => {
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();

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

    // Функция для получения цвета школы магии
    const getSchoolColor = (school) => {
        switch (school) {
            case 'Вызов':
                return 'primary'; // Синий
            case 'Иллюзия':
                return 'secondary'; // Фиолетовый
            case 'Ограждение':
                return 'success'; // Зеленый
            case 'Некромантия':
                return 'error'; // Красный
            case 'Преобразование':
                return 'warning'; // Оранжевый
            case 'Очарование':
                return 'info'; // Голубой
            case 'Прорицание':
                return 'default'; // Серый
            default:
                return 'default'; // По умолчанию
        }
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
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {character.name}
                                </Typography>
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
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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

                                <IconButton edge="end" onClick={() => navigate(`/character-sheet/${character.id}`)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" onClick={() => deleteCharacter(character.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    ))}
                </Grid2>
            </Paper>
        </Box>
    );
};

export default CharacterManager;