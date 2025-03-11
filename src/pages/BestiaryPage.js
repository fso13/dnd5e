import React, { useState } from 'react';
import { Box } from '@mui/material';
import MonsterCards from '../components/MonsterCards';
import MonsterFilter from '../components/MonsterFilter';
import MonsterSearch from '../components/MonsterSearch';

const BestiaryPage = ({ monsters }) => {
    const [filters, setFilters] = useState({ type: '', cr: '' });
    const [searchTerm, setSearchTerm] = useState('');

    // Фильтрация монстров
    const filteredMonsters = monsters.filter(monster => {
        return (
            (filters.type ? monster.type === filters.type : true) &&
            (filters.cr ? monster.cr === filters.cr : true) &&
            (searchTerm ? monster.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
        );
    });

    return (
        <Box sx={{ padding: 3 }}>
            {/* Поле поиска и фильтры */}
            <MonsterSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <MonsterFilter
                filters={filters}
                setFilters={setFilters}
            />

            {/* Отображение монстров */}
            {<MonsterCards monsters={filteredMonsters} />}
            {/* Добавьте компоненты MonsterList и MonsterTable, если нужно */}
        </Box>
    );
};

export default BestiaryPage;