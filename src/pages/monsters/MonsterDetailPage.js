import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Divider, Chip, CardMedia } from '@mui/material';
import BookmarkButton from '../../components/bookmark/BookmarkButton';
import {getTypeColor} from '../../components/monsters/MonsterUtils'

const MonsterDetailPage = ({ monsters, bookmarks, addMonsterToBookmark, addBookmark }) => {
    const { monsterName } = useParams(); // Получаем имя монстра из URL
    const monster = monsters.find(monster => monster.name === monsterName); // Находим монстра по имени

    if (!monster) {
        return <Typography variant="h4">Монстр не найден</Typography>;
    }

    return (
        <Box sx={{ padding: 3, maxWidth: 800, margin: '0 auto' }}>
            <Paper elevation={3} sx={{ padding: 3 }}>

                {/* Заголовок и кнопка закладки */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {monster.name}
                    </Typography>
                    <BookmarkButton
                        bookmarks={bookmarks}
                        addBookmark={addBookmark}
                        onAddToBookmark={(bookmarkId) => addMonsterToBookmark(bookmarkId, monster)}
                    /></Box>
                <CardMedia
                    component="img"
                    src={`${process.env.PUBLIC_URL}/static/image/monsters/` + monster.imgStaticUrl}
                    alt={monster.name}
                    sx={{ width: '100%', height: '100%', maxHeight: 300, objectFit: 'contain' }}

                >

                </CardMedia>

                <Divider sx={{ my: 3 }} />
                {/* Метка "Дополнение" */}
                <Chip label={monster.type} color={getTypeColor(monster.type)} />

                {/* Основная информация */}
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Размер:</strong> {monster.size}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Класс опасности (CR):</strong> {monster.cr}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Хиты:</strong> {monster.hp}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Скорость:</strong> {monster.speed}
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Описание с HTML-разметкой */}
                {monster.fiction && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Описание
                        </Typography>
                        <div
                            dangerouslySetInnerHTML={{ __html: monster.fiction }}
                            style={{ lineHeight: monster.lineHeight || '1.5' }}
                        />
                    </Box>
                )}

                <Divider sx={{ my: 3 }} />

                {/* Черты и действия */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Черты
                </Typography>
                {monster.monsterTrait?.map((trait, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <div dangerouslySetInnerHTML={{ __html: trait.name }} />
                        <div dangerouslySetInnerHTML={{ __html: trait.text }} />
                    </Box>
                ))}
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Действия
                </Typography>
                {monster.monsterAction?.map((action, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <div dangerouslySetInnerHTML={{ __html: action.name }} />
                        <div dangerouslySetInnerHTML={{ __html: action.text }} />
                    </Box>
                ))}
            </Paper>
        </Box>
    );
};

export default MonsterDetailPage;