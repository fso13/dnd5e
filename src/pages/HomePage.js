import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import SpellCards from '../components/SpellCards';
import SpellFilter from '../components/SpellFilter';
import SpellSearch from '../components/SpellSearch';

const HomePage = ({ spells }) => {
    const [filters, setFilters] = useState({ class: '', level: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [isFiltersVisible, setIsFiltersVisible] = useState(true);

    // Фильтрация заклинаний
    const filteredSpells = spells.filter(spell => {
        return (
            (filters.class ? spell.spellClass.some(cls => cls.name === filters.class) : true) &&
            (filters.level ? spell.level === filters.level : true) &&
            (searchTerm ? spell.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
        );
    });

    // Сброс фильтров
    const handleResetFilters = () => {
        setFilters({ class: '', level: '' });
        setSearchTerm('');
    };

    // Переключение видимости фильтров
    const handleToggleFilters = () => {
        setIsFiltersVisible(!isFiltersVisible);
    };

    return (
        <Box>
            {/* Поле поиска и кнопки */}
            <SpellSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onResetFilters={handleResetFilters}
                onToggleFilters={handleToggleFilters}
            />

            {/* Фильтры */}
            <SpellFilter
                filters={filters}
                setFilters={setFilters}
                isFiltersVisible={isFiltersVisible}
            />

            {<SpellCards spells={filteredSpells} />}
        </Box>
    );
};

export default HomePage;