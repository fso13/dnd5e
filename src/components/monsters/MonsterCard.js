import React, { useState } from 'react';
import { Delete } from '@mui/icons-material';
import { Card, CardMedia, CardHeader, CardContent, Typography, Grid2, Paper, Divider, Chip, Box, IconButton, Collapse, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookmarkButton from '../bookmark/BookmarkButton';
import { getTypeColor } from './MonsterUtils'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const MonsterCard = ({ monster, index, bookmark, bookmarks, addMonsterToBookmark, addBookmark, removeMonsterFromBookmark }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // Обработчик клика по карточке
    const handleCardClick = (monsterName) => {
        navigate(`/bestiary/${monsterName}`);
    };

    return (
        <Grid2 item key={index} xs={12} sm={6} md={4}>
            <Paper
                elevation={3}
                sx={{
                    width: 300,
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    },
                }}

            >
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        title={monster.name.rus}
                        action={
                            removeMonsterFromBookmark ? (
                                <IconButton onClick={() => removeMonsterFromBookmark(bookmark.id, monster.name.rus)}>
                                    <Delete />
                                </IconButton>
                            ) : (<BookmarkButton
                                bookmarks={bookmarks}
                                addBookmark={addBookmark}
                                onAddToBookmark={(bookmarkId) => addMonsterToBookmark(bookmarkId, monster)}
                            />)
                        }
                    />
                    <IconButton onClick={handleExpandClick}>
                        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    <Chip
                        label={monster.type.name}
                        color={getTypeColor(monster.type.name)}
                        size="small"
                        sx={{ mb: 2 }}
                    />
                    <CardActionArea onClick={() => handleCardClick(monster.name.rus)}>
                        <CardContent>


                            {monster.images &&
                                <Collapse in={expanded}>
                                    <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            src={`${process.env.PUBLIC_URL}/static/image/monsternew/` + monster.id + '.webp'}
                                            alt={monster.name.rus}
                                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Box>
                                </Collapse>
                            }

                            <Divider sx={{ my: 2 }} />

                            {/* Основная информация */}
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Размер:</strong> {monster.size.rus}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Класс опасности (CR):</strong> {monster.challengeRating}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Хиты:</strong> {monster.hits.formula + ' (' + monster.hits.average + ')'}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Скорость:</strong> {monster.speed[0].value}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            {/* Биомы */}
                            {monster.environment && <Typography variant="body2">
                                <strong>Места обитания:</strong> {monster.environment.join(', ')}
                            </Typography>}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Paper>
        </Grid2>
    );

};

export default MonsterCard;