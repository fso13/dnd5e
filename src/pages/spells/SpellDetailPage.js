import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Divider, Chip, Stack } from '@mui/material';
import BookmarkButton from '../../components/bookmark/BookmarkButton';

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

const SpellDetailPage = ({ spells, bookmarks, addSpellToBookmark, addBookmark }) => {
    const { spellName } = useParams(); // Получаем имя заклинания из URL
    const spell = spells.find(spell => spell.name === spellName); // Находим заклинание по имени

    if (!spell) {
        return <Typography variant="h4">Заклинание не найдено</Typography>;
    }

    return (
        <Box sx={{ padding: 3, maxWidth: 800, margin: '0 auto' }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                {/* Заголовок и кнопка закладки */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {spell.name}
                    </Typography>
                    <BookmarkButton spell={spell} bookmarks={bookmarks} addSpellToBookmark={addSpellToBookmark} addBookmark={addBookmark} />
                </Box>

                {/* Основная информация */}
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    {spell.school ? (<Chip label={`Школа: ${spell.school}`} color={getSchoolColor(spell.school)} />) : (<div />)}
                    <Chip label={`Уровень: ${spell.level}`} color="secondary" />
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Описание заклинания */}
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {spell.text}
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Детали заклинания */}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Детали заклинания
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
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Длительность:</strong> {spell.duration}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Классы:</strong> {spell.spellClass.map(cls => cls.name).join(', ')}
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Дополнительная информация (если есть) */}
                {spell.additionalInfo && (
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Дополнительная информация
                        </Typography>
                        <Typography variant="body2">{spell.additionalInfo}</Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default SpellDetailPage;