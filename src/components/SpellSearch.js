import React from 'react';
import { TextField, IconButton, InputAdornment, Box } from '@mui/material';
import { Search, Clear, FilterList } from '@mui/icons-material';

const SpellSearch = ({ searchTerm, setSearchTerm, onResetFilters, onToggleFilters }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
            {/* Поле поиска */}
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Поиск по названию"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setSearchTerm('')} size="small">
                                <Clear />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            {/* Кнопка сброса фильтров */}
            <IconButton onClick={onResetFilters} color="primary">
                <Clear />
            </IconButton>

            {/* Кнопка скрытия/показа фильтров */}
            <IconButton onClick={onToggleFilters} color="primary">
                <FilterList />
            </IconButton>
        </Box>
    );
};

export default SpellSearch;