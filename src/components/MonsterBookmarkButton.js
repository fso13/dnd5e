import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { BookmarkBorder } from '@mui/icons-material';
import MonsterBookmarkModal from './MonsterBookmarkModal';

const MonsterBookmarkButton = ({ monster }) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Tooltip title="Добавить в закладку">
                <IconButton onClick={() => setModalOpen(true)} color="primary">
                    <BookmarkBorder />
                </IconButton>
            </Tooltip>
            <MonsterBookmarkModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onAddToBookmark={() => setModalOpen(false)}
                monster={monster}
            />
        </>
    );
};

export default MonsterBookmarkButton;