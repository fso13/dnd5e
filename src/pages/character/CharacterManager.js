import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    IconButton,
    Chip,
    Divider,
    CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../auth/ConfirmationModal';
import { useSnackbar } from 'notistack';
import { getSchoolColor } from '../../components/spells/SpellUtils';
import { getCharacters, addCharacter, deleteCharacter } from './charactersService';
import { useAuth } from '../../components/firebase/AuthContext';

const CharacterManager = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Загрузка персонажей
    useEffect(() => {
        const loadCharacters = async () => {
            if (!currentUser) return;

            try {
                setLoading(true);
                const userCharacters = await getCharacters(currentUser.uid);
                setCharacters(userCharacters);
            } catch (error) {
                console.error('Error loading characters:', error);
                enqueueSnackbar('Ошибка загрузки персонажей', { variant: 'error' });
            } finally {
                setLoading(false);
            }
        };

        loadCharacters();
    }, [currentUser, enqueueSnackbar]);

    // Обработчики удаления
    const handleDeleteClick = (id) => {
        setDeletingId(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deletingId) return;

        try {
            setLoading(true);
            await deleteCharacter(deletingId);
            setCharacters(prev => prev.filter(char => char.id !== deletingId));
            enqueueSnackbar('Персонаж удален', { variant: 'success' });
        } catch (error) {
            console.error('Error deleting character:', error);
            enqueueSnackbar('Ошибка удаления персонажа', { variant: 'error' });
        } finally {
            setDeleteModalOpen(false);
            setDeletingId(null);
            setLoading(false);
        }
    };

    // Создание нового персонажа
    const handleAddCharacter = async () => {
        if (!currentUser) {
            enqueueSnackbar('Для создания персонажа необходимо войти в систему', { variant: 'error' });
            return;
        }

        const newCharacter = {
            name: 'Новый персонаж',
            race: '',
            class: '',
            level: 1,
            stats: {
                strength: 10,
                dexterity: 10,
                constitution: 10,
                intelligence: 10,
                wisdom: 10,
                charisma: 10,
            },
            proficiencyBonus: 2,
            skills: '',
            spells: [],
            inventory: '',
            description: '',
        };

        try {
            setLoading(true);
            const createdCharacter = await addCharacter(currentUser.uid, newCharacter);
            setCharacters(prev => [...prev, createdCharacter]);
            enqueueSnackbar('Персонаж создан', { variant: 'success' });

            // Переход на страницу редактирования нового персонажа
            navigate(`/character-sheet/${createdCharacter.id}`);
        } catch (error) {
            console.error('Error creating character:', error);
            enqueueSnackbar('Ошибка создания персонажа', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleSpellClick = (spellName) => {
        navigate(`/spells/${spellName}`);
    };

    if (loading && characters.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Управление персонажами D&D 5e
            </Typography>

            <Paper elevation={3} sx={{ padding: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddCharacter}
                    disabled={loading}
                    sx={{ mb: 3 }}
                >
                    {loading ? 'Создание...' : 'Создать нового персонажа'}
                </Button>

                {characters.length === 0 ? (
                    <Typography>У вас пока нет персонажей</Typography>
                ) : (
                    <Grid container spacing={3}>
                        {characters.map((character) => (
                            <Grid item xs={12} sm={6} md={4} key={character.id}>
                                <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            {character.name}
                                        </Typography>
                                        <Box>
                                            <IconButton
                                                onClick={() => navigate(`/character-sheet/${character.id}`)}
                                                disabled={loading}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDeleteClick(character.id)}
                                                disabled={loading}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                                        {character.race} {character.class}, уровень {character.level}
                                    </Typography>

                                    {character.spells.length > 0 && (
                                        <>
                                            <Divider sx={{ my: 2 }} />
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {character.spells.map((spell, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={spell}
                                                        onClick={() => handleSpellClick(spell)}
                                                        color={getSchoolColor(spell)}
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </>
                                    )}
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Paper>

            <ConfirmationModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Подтверждение удаления"
                message="Вы уверены, что хотите удалить этого персонажа?"
                loading={loading}
            />
        </Box>
    );
};

export default CharacterManager;