import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { BookmarkBorder } from '@mui/icons-material';
import BookmarkModal from './BookmarkModal';

const BookmarkButton = ({ bookmarks, onAddToBookmark, addBookmark }) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
        <Tooltip title="Добавить в закладку">
                <IconButton onClick={() => setModalOpen(true)} color="primary">
                    <BookmarkBorder />
                </IconButton>
            </Tooltip>
            
            <BookmarkModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                bookmarks={bookmarks}
                addBookmark={addBookmark}
                onAddToBookmark={onAddToBookmark}
            />
        </>
    );
};

export default BookmarkButton;