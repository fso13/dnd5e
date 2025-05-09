import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box, Typography, TextField, Button, Grid, Paper, Chip,
    Autocomplete, Divider, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { getCharacterById, updateCharacter } from './charactersService';
import { useAuth } from '../../components/firebase/AuthContext';

const CharacterSheetPage = () => {
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [spellSearch, setSpellSearch] = useState('');
    const [spellResults, setSpellResults] = useState([]);
    const [cachedSpells, setCachedSpells] = useState([]);
    const [character, setCharacter] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loadCharacter = async () => {
            try {
                const loadedCharacter = await getCharacterById(id);
                if (!loadedCharacter) {
                    navigate('/character-sheet');
                    enqueueSnackbar('Персонаж не найден', { variant: 'error' });
                    return;
                }

                if (loadedCharacter.userId !== currentUser?.uid) {
                    navigate('/character-sheet');
                    enqueueSnackbar('Нет доступа к этому персонажу', { variant: 'error' });
                    return;
                }

                setCharacter(loadedCharacter);
            } catch (error) {
                console.error('Error loading character:', error);
                enqueueSnackbar('Ошибка загрузки персонажа', { variant: 'error' });
                navigate('/character-sheet');
            }
        };

        const cachedSpellsData = localStorage.getItem('cached_spells');
        if (cachedSpellsData) {
            setCachedSpells(JSON.parse(cachedSpellsData));
        }

        loadCharacter();
    }, [id, navigate, enqueueSnackbar, currentUser]);

    const handleSave = async () => {
        if (!character || !currentUser) return;

        try {
            await updateCharacter(character.id, {
                ...character,
                updatedAt: new Date().toISOString()
            });
            enqueueSnackbar('Персонаж сохранен', { variant: 'success' });
            navigate('/character-sheet');
        } catch (error) {
            console.error('Error saving character:', error);
            enqueueSnackbar('Ошибка сохранения персонажа', { variant: 'error' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in character.stats) {
            setCharacter(prev => ({
                ...prev,
                stats: {
                    ...prev.stats,
                    [name]: value,
                },
            }));
        } else {
            setCharacter(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSpellSearch = (query) => {
        setSpellSearch(query);
        if (query.length > 2 && cachedSpells.length > 0) {
            const filteredSpells = cachedSpells.filter(spell =>
                spell.name.rus.toLowerCase().includes(query.toLowerCase())
            );
            setSpellResults(filteredSpells);
        } else {
            setSpellResults([]);
        }
    };

    const handleSpellSelect = (spell) => {
        if (!character.spells.includes(spell.name.rus)) {
            setCharacter(prev => ({
                ...prev,
                spells: [...prev.spells, spell.name.rus],
            }));
        }
        setSpellSearch('');
    };

    const handleSpellDelete = (spellToDelete) => {
        setCharacter(prev => ({
            ...prev,
            spells: prev.spells.filter(spell => spell !== spellToDelete),
        }));
    };

    if (!character) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Typography>Загрузка...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Лист персонажа
            </Typography>

            <Paper elevation={3} sx={{ padding: 1 }}>
                <Grid container spacing={1} >
                    {/* Основная информация */}
                    <Grid item xs={12} md={6} >
                        <TextField
                            fullWidth
                            label="Имя персонажа"
                            name="name"
                            value={character.name}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Раса</InputLabel>
                            <Select
                                label="Раса"
                                name="race"
                                value={character.race}
                                onChange={handleChange}
                            >
                                {['Гном', 'Дварф', 'Драконорожденный', 'Полуорк', 'Полурослик',
                                    'Полуэльф', 'Тифлинг', 'Человек', 'Эльф'].map(race => (
                                        <MenuItem key={race} value={race}>{race}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Класс</InputLabel>
                            <Select
                                label="Класс"
                                name="class"
                                value={character.class}
                                onChange={handleChange}
                            >
                                {['Жрец', 'Друид', 'Бард', 'Паладин', 'Следопыт',
                                    'Чародей', 'Колдун', 'Волшебник', 'Изобретатель',
                                    'Шаман', 'Магус'].map(cls => (
                                        <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField sx={{ mb: 2 }}
                            fullWidth
                            label="Уровень"
                            name="level"
                            type="number"
                            value={character.level}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField sx={{ mb: 2 }}
                            fullWidth
                            label="Бонус мастерства"
                            name="proficiencyBonus"
                            type="number"
                            value={character.proficiencyBonus}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                {/* Характеристики */}
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Характеристики</Typography>

                <Grid container spacing={1} >
                    {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(stat => (
                        <Grid item xs={6} md={4} key={stat}>
                            <TextField sx={{ mb: 2 }}
                                fullWidth
                                label={getStatLabel(stat)}
                                name={stat}
                                type="number"
                                value={character.stats[stat]}
                                onChange={handleChange}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Divider sx={{ my: 2 }} />
                <TextField
                    fullWidth
                    label="Навыки"
                    name="skills"
                    value={character.skills}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />
                {/* Заклинания */}
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Заклинания</Typography>

                <Autocomplete
                    freeSolo
                    options={spellResults.map(spell => spell.name.rus)}
                    inputValue={spellSearch}
                    onInputChange={(e, value) => handleSpellSearch(value)}
                    onChange={(e, value) => {
                        const selectedSpell = spellResults.find(s => s.name.rus === value);
                        if (selectedSpell) handleSpellSelect(selectedSpell);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Поиск заклинаний" />
                    )}
                />

                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {character.spells.map((spell, index) => (
                        <Chip
                            key={index}
                            label={spell}
                            onDelete={() => handleSpellDelete(spell)}
                            sx={{ mr: 1, mb: 1 }}
                        />
                    ))}
                </Box>

                <TextField
                    fullWidth
                    label="Инвентарь"
                    name="inventory"
                    value={character.inventory}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Описание"
                    name="description"
                    value={character.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                />

                {/* Кнопка сохранения */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{ mt: 2 }}
                >
                    Сохранить персонажа
                </Button>
            </Paper>
        </Box>
    );
};

function getStatLabel(stat) {
    const labels = {
        strength: 'Сила',
        dexterity: 'Ловкость',
        constitution: 'Телосложение',
        intelligence: 'Интеллект',
        wisdom: 'Мудрость',
        charisma: 'Харизма'
    };
    return labels[stat] || stat;
}

export default CharacterSheetPage;