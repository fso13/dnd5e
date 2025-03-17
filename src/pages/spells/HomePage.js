import React, { useState } from 'react';
import { Box, Pagination } from '@mui/material';
import SpellCards from '../../components/spells/SpellCards';
import SpellFilter from '../../components/spells/SpellFilter';
import SpellSearch from '../../components/spells/SpellSearch';

const HomePage = ({ spells, bookmarks, addSpellToBookmark, addBookmark }) => {
    const [filters, setFilters] = useState({ class: '', level: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [isFiltersVisible, setIsFiltersVisible] = useState(true);
    const [page, setPage] = useState(1); // Текущая страница
    const itemsPerPage = 28; // Количество заклинаний на странице
    // Фильтрация заклинаний
    const filteredSpells = spells.filter(spell => {
        return (
            (filters.class ? spell.classes.some(cls => cls.name === filters.class) : true) &&
            (filters.level ? spell.level === filters.level : true) &&
            (searchTerm ? spell.name.rus.toLowerCase().includes(searchTerm.toLowerCase()) : true)
        );
    });

    // Вычисление видимых заклинаний
    const startIndex = (page - 1) * itemsPerPage;
    const visibleSpells = filteredSpells.slice(startIndex, startIndex + itemsPerPage);

    // Сброс фильтров
    const handleResetFilters = () => {
        setFilters({ class: '', level: '' });
        setSearchTerm('');
    };

    // Переключение видимости фильтров
    const handleToggleFilters = () => {
        setIsFiltersVisible(!isFiltersVisible);
    };

    // Сброс страницы на первую при изменении фильтров или поискового запроса
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPage(1); // Сброс на первую страницу
    };

    const handleSearchChange = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
        setPage(1); // Сброс на первую страницу
    };

    return (
        <Box>
            {/* Поле поиска и кнопки */}
            <SpellSearch
                searchTerm={searchTerm}
                setSearchTerm={handleSearchChange}
                onResetFilters={handleResetFilters}
                onToggleFilters={handleToggleFilters}
            />

            {/* Фильтры */}
            <SpellFilter
                filters={filters}
                setFilters={handleFilterChange}
                isFiltersVisible={isFiltersVisible}
            />

            {<SpellCards spells={visibleSpells} bookmarks={bookmarks} addSpellToBookmark={addSpellToBookmark} addBookmark={addBookmark} />}
            {/* Пагинация */}
            <Pagination
                count={Math.ceil(filteredSpells.length / itemsPerPage)}
                page={page}
                onChange={(event, value) => setPage(value)}
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
        </Box>
    );
};

export default HomePage;