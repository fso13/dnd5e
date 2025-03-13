import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography,Divider } from '@mui/material';
import SpellCards from '../components/SpellCards';
import MonsterCards from '../components/MonsterCards';
const BookmarkDetailPage = () => {
    const { bookmarkId } = useParams();
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const bookmark = bookmarks.find(b => b.id === parseInt(bookmarkId));

    if (!bookmark) {
        return <Typography variant="h4">Закладка не найдена</Typography>;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4">{bookmark.name}</Typography>
            <SpellCards spells={bookmark.spells} />
            {/* Или используйте SpellTable или SpellCards */}
            {/* Отображение монстров */}
            <Divider sx={{ my: 3 }} />
            {<MonsterCards monsters={bookmark.monsters} />}
        </Box>
    );
};

export default BookmarkDetailPage;