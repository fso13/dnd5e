import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Collapse } from '@mui/material';

const SpellFilter = ({ filters, setFilters, isFiltersVisible }) => {
    const handleChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.value });
    };

    return (
        <Collapse in={isFiltersVisible}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <FormControl fullWidth size="small">
                    <InputLabel>Класс</InputLabel>
                    <Select
                        name="class"
                        value={filters.class}
                        onChange={handleChange}
                        label="Класс"
                    >
                        <MenuItem value="Жрец">Жрец</MenuItem>
                        <MenuItem value="Друид">Друид</MenuItem>
                        <MenuItem value="Бард">Бард</MenuItem>
                        <MenuItem value="Паладин">Паладин</MenuItem>
                        <MenuItem value="Рейнджер">Рейнджер</MenuItem>
                        <MenuItem value="Чародей">Чародей</MenuItem>
                        <MenuItem value="Колдун">Колдун</MenuItem>
                        <MenuItem value="Волшебник">Волшебник</MenuItem>
                        <MenuItem value="Изобретатель">Изобретатель</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                    <InputLabel>Уровень</InputLabel>
                    <Select
                        name="level"
                        value={filters.level}
                        onChange={handleChange}
                        label="Уровень"
                    >
                        <MenuItem value="0">0</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                        <MenuItem value="9">9</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Collapse>
    );
};

export default SpellFilter;