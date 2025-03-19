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
                        title={monster.name}
                        action={
                            removeMonsterFromBookmark ? (
                                <IconButton onClick={() => removeMonsterFromBookmark(bookmark.id, monster.name)}>
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
                        label={monster.type}
                        color={getTypeColor(monster.type)}
                        size="small"
                        sx={{ mb: 2 }}
                    />
                    <CardActionArea onClick={() => handleCardClick(monster.name)}>
                        <CardContent>


                            <Collapse in={expanded}>
                                <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        src={`${process.env.PUBLIC_URL}/static/image/monsters/` + monster.imgStaticUrl}
                                        alt={monster.name}
                                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </Box>
                            </Collapse>


                            <Divider sx={{ my: 2 }} />

                            {/* Основная информация */}
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Размер:</strong> {monster.size}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Класс опасности (CR):</strong> {monster.cr}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Хиты:</strong> {monster.hp}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Скорость:</strong> {monster.speed}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            {/* Биомы */}
                            <Typography variant="body2">
                                <strong>Биомы:</strong> {monster.bioms.join(', ')}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Paper>
        </Grid2>
    );

};

export default MonsterCard;