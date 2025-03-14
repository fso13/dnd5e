import React from 'react';
import { Card, CardContent, CardHeader, Typography, Grid2, Paper, Divider, Chip, Stack, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookmarkButton from '../bookmark/BookmarkButton';
import { Delete } from '@mui/icons-material';

// Функция для получения цвета школы магии
const getSchoolColor = (school) => {
    switch (school) {
        case 'Вызов':
            return 'primary'; // Синий
        case 'Иллюзия':
            return 'secondary'; // Фиолетовый
        case 'Ограждение':
            return 'success'; // Зеленый
        case 'Некромантия':
            return 'error'; // Красный
        case 'Преобразование':
            return 'warning'; // Оранжевый
        case 'Очарование':
            return 'info'; // Голубой
        case 'Прорицание':
            return 'default'; // Серый
        default:
            return 'default'; // По умолчанию
    }
};

const SpellCard = ({ spell, bookmark, index, bookmarks, addSpellToBookmark, addBookmark, removeSpellFromBookmark }) => {
    const navigate = useNavigate();

    // Обработчик клика по карточке
    const handleCardClick = (spellName) => {
        navigate(`/spells/${spellName}`);
    };


    return (<Grid2 item key={index} xs={12} sm={6} md={4}>
        <Paper
            elevation={3}
            sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                },
            }}

        >
            <Card sx={{ height: '100%' }}>
                <Box sx={{ width: 300, height: 300, overflow: 'hidden', position: 'relative' }}>
                    <CardHeader

                        title={spell.name}
                        action={
                            removeSpellFromBookmark ? (
                                <IconButton onClick={() => removeSpellFromBookmark(bookmark.id, spell.name)}>
                                    <Delete />
                                </IconButton>
                            ) : (<BookmarkButton
                                bookmarks={bookmarks}
                                addBookmark={addBookmark}
                                onAddToBookmark={(bookmarkId) => addSpellToBookmark(bookmarkId, spell)}
                            />)
                        }
                    />
                    <CardContent onClick={() => handleCardClick(spell.name)}>
                        {/* Заголовок и школа */}
                        {/* Основная информация */}
                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            {spell.school ? (<Chip label={`Школа: ${spell.school}`} color={getSchoolColor(spell.school)} />) : (<div />)}

                            <Chip label={`Уровень: ${spell.level}`} color="secondary" />
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        {/* Основная информация */}
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Уровень:</strong> {spell.level}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Время накладывания:</strong> {spell.castingTime}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Дистанция:</strong> {spell.range}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Компоненты:</strong> {spell.components}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        {/* Классы */}
                        <Typography variant="body2">
                            <strong>Классы:</strong> {spell.spellClass.map(cls => cls.name).join(', ')}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Paper>
    </Grid2>

    );
};

export default SpellCard;