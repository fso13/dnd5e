import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { BookmarkBorder } from '@mui/icons-material';
import SpellBookmarkModal from './SpellBookmarkModal';

const SpellBookmarkButton = ({ spell }) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Tooltip title="Добавить в закладку">
                <IconButton onClick={() => setModalOpen(true)} color="primary">
                    <BookmarkBorder />
                </IconButton>
            </Tooltip>
            <SpellBookmarkModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onAddToBookmark={() => setModalOpen(false)}
                spell={spell}
            />
        </>
    );
};

export default SpellBookmarkButton;