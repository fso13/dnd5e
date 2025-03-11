import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import SpellCards from '../components/SpellCards';

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
        </Box>
    );
};

export default BookmarkDetailPage;