import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid2, Paper, Chip, Autocomplete, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CharacterSheetPage = () => {


    const { id } = useParams(); // Получаем ID персонажа из URL

    console.log(id);
    const [spellSearch, setSpellSearch] = useState('');
    const [spellResults, setSpellResults] = useState([]);
    const [cachedSpells, setCachedSpells] = useState([]);

    const [editedCharacter, setEditedCharacter] = useState(null);
    const navigate = useNavigate();
    // Загрузка данных персонажа
    useEffect(() => {
        console.log(localStorage.getItem('dndCharacters'));

        const savedCharacters = JSON.parse(localStorage.getItem('dndCharacters'));
        const character = savedCharacters.find(char => char.id === parseInt(id));

        console.log(character);

        const cachedSpellsData = localStorage.getItem('cached_spells');
        if (cachedSpellsData) {
            setCachedSpells(JSON.parse(cachedSpellsData));
        }

        if (character) {
            setEditedCharacter(character);
        } else {
            navigate('/'); // Если персонаж не найден, вернуться на главную
        }

    }, [id, navigate]);


    // Обработчик клика по карточке
    const handleSpellClick = (name) => {
        navigate(`/spells/${name}`);
    };

    // Сохранение изменений
    const handleSave = () => {
        const savedCharacters = JSON.parse(localStorage.getItem('dndCharacters')) || [];
        const updatedCharacters = savedCharacters.map(char =>
            char.id === editedCharacter.id ? editedCharacter : char
        );
        localStorage.setItem('dndCharacters', JSON.stringify(updatedCharacters));
        navigate('/character-sheet'); // Вернуться на главную страницу
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in editedCharacter.stats) {
            setEditedCharacter({
                ...editedCharacter,
                stats: {
                    ...editedCharacter.stats,
                    [name]: value,
                },
            });
        } else {
            setEditedCharacter({
                ...editedCharacter,
                [name]: value,
            });
        }
    };

    // Поиск заклинаний в cached_spells
    const handleSpellSearch = (query) => {
        setSpellSearch(query);
        if (query.length > 2) {
            const filteredSpells = cachedSpells.filter(spell =>
                spell.name.rus.toLowerCase().includes(query.toLowerCase())
            );
            setSpellResults(filteredSpells);
        } else {
            setSpellResults([]);
        }
    };

    // Добавление заклинания в список
    const handleSpellSelect = (spell) => {
        if (!editedCharacter.spells.includes(spell.name.rus)) {
            setEditedCharacter((prevCharacter) => ({
                ...prevCharacter,
                spells: [...prevCharacter.spells, spell.name.rus], // Добавляем заклинание в список
            }));
        }
        setSpellSearch(''); // Очищаем поле поиска
    };

    // Удаление заклинания из списка
    const handleSpellDelete = (spellToDelete) => {
        setEditedCharacter((prevCharacter) => ({
            ...prevCharacter,
            spells: prevCharacter.spells.filter(spell => spell !== spellToDelete), // Удаляем заклинание
        }));
    };

    if (!editedCharacter) {
        return <Typography>Загрузка...</Typography>;
    }

    return (


        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Лист персонажа
            </Typography>
            <Paper elevation={3} sx={{ padding: 1 }}>
                <Grid2 container spacing={1} >
                    {/* Основная информация */}
                    <Grid2 item xs={12} md={6} >
                        <TextField
                            fullWidth
                            label="Имя персонажа"
                            name="name"
                            value={editedCharacter.name}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid2>
                    <Grid2 item xs={12} md={6}>
                        <FormControl sx={{ minWidth: 120 }} >
                            <InputLabel>Раса</InputLabel>
                            <Select
                                label="Раса"
                                name="race"
                                value={editedCharacter.race}
                                onChange={handleChange}
                            >
                                <MenuItem value="Гном">Гном</MenuItem>
                                <MenuItem value="Дварф">Дварф</MenuItem>
                                <MenuItem value="Драконорожденный">Драконорожденный</MenuItem>
                                <MenuItem value="Полуорк">Полуорк</MenuItem>
                                <MenuItem value="Полурослик">Полурослик</MenuItem>
                                <MenuItem value="Полуэльф">Полуэльф</MenuItem>
                                <MenuItem value="Тифлинг">Тифлинг</MenuItem>
                                <MenuItem value="Человек">Человек</MenuItem>
                                <MenuItem value="Эльф">Эльф</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid2>

                    <Grid2 item xs={12} md={6}>
                        <FormControl sx={{ minWidth: 120 }} >
                            <InputLabel>Класс</InputLabel>
                            <Select
                                label="Класс"
                                name="class"
                                value={editedCharacter.class}
                                onChange={handleChange}
                            >
                                <MenuItem value="Жрец">Жрец</MenuItem>
                                <MenuItem value="Друид">Друид</MenuItem>
                                <MenuItem value="Бард">Бард</MenuItem>
                                <MenuItem value="Паладин">Паладин</MenuItem>
                                <MenuItem value="Следопыт">Следопыт</MenuItem>
                                <MenuItem value="Чародей">Чародей</MenuItem>
                                <MenuItem value="Колдун">Колдун</MenuItem>
                                <MenuItem value="Волшебник">Волшебник</MenuItem>
                                <MenuItem value="Изобретатель">Изобретатель</MenuItem>
                                <MenuItem value="Шаман">Шаман</MenuItem>
                                <MenuItem value="Магус">Магус</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 item xs={12} md={6} >
                        <TextField
                            fullWidth
                            label="Уровень"
                            name="level"
                            value={editedCharacter.level}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid2>
                    <Grid2 item xs={12} md={6} >
                        <TextField
                            fullWidth
                            label="Бонус мастерства"
                            name="proficiencyBonus"
                            value={editedCharacter.proficiencyBonus}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid2>
                </Grid2>
                <Divider sx={{ my: 2 }} />
                {/* Характеристики */}
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Характеристики
                </Typography>
                <Grid2 container spacing={1} >

                    <Grid2 item xs={12} md={6} >
                        <TextField
                            fullWidth
                            label="Сила"
                            name="strength"
                            value={editedCharacter.stats.strength}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid2>
                    <Grid2 item xs={12} md={6} >
                        <TextField
                            fullWidth
                            label="Ловкость"
                            name="dexterity"
                            value={editedCharacter.stats.dexterity}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid2>
                    <Grid2 item xs={12} md={6} >
                        <TextField
                            fullWidth
                            label="Телосложение"
                            name="constitution"
                            value={editedCharacter.stats.constitution}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid2>
                    <Grid2 item xs={12} md={6} >
                        <TextField
                            fullWidth
                            label="Интеллект"
                            name="intelligence"
                            value={editedCharacter.stats.intelligence}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid2>
                    <Grid2 item xs={12} md={6} >
                        <TextField
                            fullWidth
                            label="Мудрость"
                            name="wisdom"
                            value={editedCharacter.stats.wisdom}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid2>
                    <Grid2 item xs={12} md={6} >
                        <TextField
                            fullWidth
                            label="Харизма"
                            name="charisma"
                            value={editedCharacter.stats.charisma}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid2>
                </Grid2>
                <Divider sx={{ my: 2 }} />
                {/* Навыки, заклинания, инвентарь, описание */}
                <Grid2 item xs={12}>
                    <TextField
                        fullWidth
                        label="Навыки"
                        name="skills"
                        value={editedCharacter.skills}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Заклинания
                        </Typography>
                        <Autocomplete
                            freeSolo
                            options={spellResults.map(spell => spell.name.rus)}
                            inputValue={spellSearch}
                            onInputChange={(event, newInputValue) => {
                                handleSpellSearch(newInputValue);
                            }}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    const selectedSpell = spellResults.find(spell => spell.name.rus === newValue);
                                    if (selectedSpell) {
                                        handleSpellSelect(selectedSpell);
                                    }
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Поиск заклинаний"
                                    variant="outlined"
                                />
                            )}
                        />
                        <Box sx={{ mt: 2 }}>
                            {editedCharacter.spells.map((spell, index) => (
                                <Chip
                                    key={index}
                                    label={spell}
                                    onClick={() => handleSpellClick(spell)}
                                    onDelete={() => handleSpellDelete(spell)}
                                    sx={{ mr: 1, mb: 1 }}
                                />
                            ))}
                        </Box>
                    </Box>
                    <TextField
                        fullWidth
                        label="Инвентарь"
                        name="inventory"
                        value={editedCharacter.inventory}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Описание"
                        name="description"
                        value={editedCharacter.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        sx={{ mb: 2 }}
                    />
                </Grid2>

                {/* Кнопка сохранения */}
                <Button onClick={handleSave} variant="contained" color="primary">
                    Сохранить персонажа
                </Button>
            </Paper>
        </Box>
    );
};

export default CharacterSheetPage;