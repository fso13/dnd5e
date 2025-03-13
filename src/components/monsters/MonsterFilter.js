import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const MonsterFilter = ({ filters, setFilters }) => {
    // Типы монстров
    const monsterTypes = ['гуманоид', 'зверь', 'нежить', 'дракон', 'элементаль'];

    // Уровни опасности (CR)
    const challengeRatings = ['0', '1/8', '1/4', '1/2', '1', '2', '3', '4', '5'];

    // Биомы
    const bioms = ['Горы', 'Леса', 'Пустыни', 'Подземелья'];

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