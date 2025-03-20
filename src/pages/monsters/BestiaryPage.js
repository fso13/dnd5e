import React, { useState } from 'react';
import { Box, Pagination } from '@mui/material';
import MonsterCards from '../../components/monsters/MonsterCards';
import MonsterFilter from '../../components/monsters/MonsterFilter';
import MonsterSearch from '../../components/monsters/MonsterSearch';

const BestiaryPage = ({ monsters, bookmarks, addMonsterToBookmark, addBookmark }) => {
    const [filters, setFilters] = useState({ type: '', cr: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1); // Текущая страница
    const itemsPerPage = 28; // Количество заклинаний на странице

    // Фильтрация монстров
    const filteredMonsters = monsters.filter(monster => {
        return (
            (filters.type ? monster.type.name === filters.type : true) &&
            (filters.cr ? monster.challengeRating === filters.cr : true) &&
            (filters.biom ? monster.environment && monster.environment.includes(filters.biom.toLowerCase()) : true) &&
            (searchTerm ? monster.name.rus.toLowerCase().includes(searchTerm.toLowerCase()) : true)
        );
    });

    // Вычисление видимых заклинаний
    const startIndex = (page - 1) * itemsPerPage;
    const visibleMonsters = filteredMonsters.slice(startIndex, startIndex + itemsPerPage);

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
        <Box sx={{ padding: 3 }}>
            {/* Поле поиска и фильтры */}
            <MonsterSearch
                searchTerm={searchTerm}
                setSearchTerm={handleSearchChange}
            />
            <MonsterFilter
                filters={filters}
                setFilters={handleFilterChange}
            />

            {/* Отображение монстров */}
            {<MonsterCards monsters={visibleMonsters} bookmarks={bookmarks} addMonsterToBookmark={addMonsterToBookmark} addBookmark={addBookmark}/>}
            {/* Добавьте компоненты MonsterList и MonsterTable, если нужно */}
            {/* Пагинация */}
            <Pagination
                count={Math.ceil(filteredMonsters.length / itemsPerPage)}
                page={page}
                onChange={(event, value) => setPage(value)}
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
        </Box>
    );
};

export default BestiaryPage;