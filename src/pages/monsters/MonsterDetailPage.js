import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Divider, Chip, CardMedia, Grid2, List, ListItem, ListItemText } from '@mui/material';
import BookmarkButton from '../../components/bookmark/BookmarkButton';
import { getTypeColor } from '../../components/monsters/MonsterUtils'

const MonsterDetailPage = ({ monsters, bookmarks, addMonsterToBookmark, addBookmark }) => {
    const { monsterName } = useParams(); // Получаем имя монстра из URL
    const monster = monsters.find(monster => monster.name.rus === monsterName); // Находим монстра по имени

    if (!monster) {
        return <Typography variant="h4">Монстр не найден</Typography>;
    }

    return (
        <Box sx={{ padding: 3, maxWidth: 800, margin: '0 auto' }}>
            <Paper elevation={3} sx={{ padding: 3 }}>

                {/* Заголовок и кнопка закладки */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {monster.name.rus}
                    </Typography>
                    <BookmarkButton
                        bookmarks={bookmarks}
                        addBookmark={addBookmark}
                        onAddToBookmark={(bookmarkId) => addMonsterToBookmark(bookmarkId, monster)}
                    /></Box>
                {monster.images && <CardMedia
                    component="img"
                    src={`${process.env.PUBLIC_URL}/static/image/monsternew/` + monster.id + '.webp'}
                    alt={monster.name.rus}
                    sx={{ width: '100%', height: '100%', maxHeight: 300, objectFit: 'contain' }}

                >

                </CardMedia>
                }

                <Divider sx={{ my: 3 }} />
                {/* Метка "Дополнение" */}
                <Chip label={monster.type.name} color={getTypeColor(monster.type.name)} />
                <Divider sx={{ my: 2 }} />

                {/* Биомы */}
                {monster.environment && <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Места обитания:</strong> {monster.environment.join(', ')}
                </Typography>}
                {/* Основная информация */}
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Размер:</strong> {monster.size.rus}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Класс опасности (CR):</strong> {monster.challengeRating}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Хиты:</strong> {monster.hits.formula + ' (' + monster.hits.average + ')'}
                </Typography>


                <Grid2 container spacing={2}>
                    <Grid2 item xs={6} sm={4}>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            <strong>Скорость:</strong>
                        </Typography>
                    </Grid2>
                    {monster.speed.map((speed, index) => (
                        <Grid2 item xs={6} sm={4}>
                            <Typography variant="body1">
                                <strong>{speed.name ? speed.name + ":" : ""}</strong> {speed.value} фт
                            </Typography>
                        </Grid2>
                    ))}
                </Grid2>
                {monster.languages && <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Языки:</strong>  {monster.languages.join(', ')}
                </Typography>}

                <Divider sx={{ my: 3 }} />
                <Grid2 item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>
                        Характеристики
                    </Typography>
                    <Grid2 container spacing={2}>
                        <Grid2 item xs={6} sm={4}>
                            <Typography variant="body1">
                                <strong>СИЛ:</strong> {monster.ability.str}
                            </Typography>
                        </Grid2>
                        <Grid2 item xs={6} sm={4}>
                            <Typography variant="body1">
                                <strong>ЛОВ:</strong> {monster.ability.dex}
                            </Typography>
                        </Grid2>
                        <Grid2 item xs={6} sm={4}>
                            <Typography variant="body1">
                                <strong>ТЕЛ:</strong> {monster.ability.con}
                            </Typography>
                        </Grid2>
                        <Grid2 item xs={6} sm={4}>
                            <Typography variant="body1">
                                <strong>ИНТ:</strong> {monster.ability.intellect}
                            </Typography>
                        </Grid2>
                        <Grid2 item xs={6} sm={4}>
                            <Typography variant="body1">
                                <strong>МДР:</strong> {monster.ability.wiz}
                            </Typography>
                        </Grid2>
                        <Grid2 item xs={6} sm={4}>
                            <Typography variant="body1">
                                <strong>ХАР:</strong> {monster.ability.cha}
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Grid2>

                <Grid2 item xs={12} md={8}>

                    {monster.skills && <div><Divider sx={{ my: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Навыки
                        </Typography>
                        <Grid2 container spacing={2}>
                            {monster.skills.map((skill, index) => (
                                <Grid2 item xs={6} sm={4}>
                                    <Typography variant="body1">
                                        <strong>{skill.name}:</strong> {skill.value}
                                    </Typography>
                                </Grid2>
                            ))}
                        </Grid2>
                    </div>}
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        Умения
                    </Typography>
                    <List>
                        {monster.feats.map((feat, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={feat.name}
                                    secondary={<div dangerouslySetInnerHTML={{ __html: feat.value }} />}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h5" gutterBottom>
                        Действия
                    </Typography>
                    <List>
                        {monster.actions.map((action, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={action.name}
                                    secondary={<div dangerouslySetInnerHTML={{ __html: action.value }} />}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    {monster.reactions && <div>
                        <Typography variant="h5" gutterBottom>
                            Реакции
                        </Typography>
                        <List>
                            {monster.reactions.map((reaction, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={reaction.name}
                                        secondary={<div dangerouslySetInnerHTML={{ __html: reaction.value }} />}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ my: 2 }} />
                    </div>}

                    {
                        monster.description && <div>
                            <Typography variant="h5" gutterBottom>
                                Описание
                            </Typography>
                            <div dangerouslySetInnerHTML={{ __html: monster.description }} />
                        </div>
                    }

                </Grid2>
            </Paper>
        </Box>
    );
};

export default MonsterDetailPage;