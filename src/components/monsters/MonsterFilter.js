import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const MonsterFilter = ({ filters, setFilters }) => {
    // Типы монстров
    const monsterTypes = [
        'гуманоид',
        'элементаль',
        'аберрация',
        'растение',
        'небожитель',
        'исчадие',
        'конструкт',
        'монстр',
        'фея',
        'демон',
        'дракон',
        'рой крошечных зверей',
        'великан',
        'нежить',
        'зверь',
        'слизь'
    ];

    // Уровни опасности (CR)
    const challengeRatings = [
        '1/8',
        '1/4',
        '1/2',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '30'
    ];

    // Биомы
    const bioms = [
        'Холмы',
        'Подземье',
        'Побережье',
        'Болота',
        'Лес',
        'Заполярье',
        'Равнина',
        'Горы',
        'Город',
        'Пустыня'];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {/* Фильтр по типу */}
            <FormControl fullWidth size="small">
                <InputLabel>Тип</InputLabel>
                <Select
                    name="type"
                    value={filters.type || ''}
                    onChange={handleChange}
                    label="Тип"
                >
                    <MenuItem value="">Все типы</MenuItem>
                    {monsterTypes.map((type, index) => (
                        <MenuItem key={index} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Фильтр по уровню опасности (CR) */}
            <FormControl fullWidth size="small">
                <InputLabel>Уровень опасности (CR)</InputLabel>
                <Select
                    name="cr"
                    value={filters.cr || ''}
                    onChange={handleChange}
                    label="Уровень опасности (CR)"
                >
                    <MenuItem value="">Все уровни</MenuItem>
                    {challengeRatings.map((cr, index) => (
                        <MenuItem key={index} value={cr}>
                            {cr}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Фильтр по биомам */}
            <FormControl fullWidth size="small">
                <InputLabel>Биом</InputLabel>
                <Select
                    name="biom"
                    value={filters.biom || ''}
                    onChange={handleChange}
                    label="Биом"
                >
                    <MenuItem value="">Все биомы</MenuItem>
                    {bioms.map((biom, index) => (
                        <MenuItem key={index} value={biom}>
                            {biom}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default MonsterFilter;