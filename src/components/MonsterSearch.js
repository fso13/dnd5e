import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

const MonsterSearch = ({ searchTerm, setSearchTerm }) => {
    return (
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
            sx={{ mb: 3 }}
        />
    );
};

export default MonsterSearch;