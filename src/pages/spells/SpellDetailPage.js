import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Divider, Chip, Stack } from '@mui/material';
import BookmarkButton from '../../components/bookmark/BookmarkButton';
import { getSchoolColor, getLevelText } from '../../components/spells/SpellUtils'

// Функция для форматирования компонентов
const formatComponents = (components) => {
    const { v, s, m } = components;
    let result = [];

    if (v) result.push('Вербальный');
    if (s) result.push('Соматический');
    if (m) result.push(`Материальный (${m})`);

    return result.join(', ');
};


const SpellDetailPage = ({ spells, bookmarks, addSpellToBookmark, addBookmark }) => {
    const { spellName } = useParams(); // Получаем имя заклинания из URL
    const spell = spells.find(spell => spell.name.rus === spellName); // Находим заклинание по имени

    if (!spell) {
        return <Typography variant="h4">Заклинание не найдено</Typography>;
    }

    return (
        <Box sx={{ padding: 3, maxWidth: 800, margin: '0 auto' }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                {/* Заголовок и кнопка закладки */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {spell.name.rus}
                    </Typography>
                    <BookmarkButton spell={spell} bookmarks={bookmarks} addSpellToBookmark={addSpellToBookmark} addBookmark={addBookmark} />
                </Box>

                {/* Основная информация */}
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    {spell.school ? (<Chip label={`Школа: ${spell.school}`} color={getSchoolColor(spell.school)} />) : (<div />)}
                    <Chip label={getLevelText(spell.level)} color="secondary" />
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Описание заклинания */}
                {/* <Typography variant="body1" sx={{ mb: 2 }}>
                    {spell.description}
                </Typography> */}

                <div
                    dangerouslySetInnerHTML={{ __html: spell.description }}
                    style={{ lineHeight: spell.lineHeight || '1.5' }}
                />

                <Divider sx={{ my: 3 }} />

                {/* Детали заклинания */}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Детали заклинания
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Время накладывания:</strong> {spell.time}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Дистанция:</strong> {spell.range}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Компоненты:</strong> {formatComponents(spell.components)}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Длительность:</strong> {spell.duration}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Классы:</strong> {spell.classes.map(cls => cls.name).join(', ')}
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