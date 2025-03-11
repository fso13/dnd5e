import React, {useState} from 'react';
import { Card, CardMedia, CardContent, Typography, Grid2, Paper, Divider, Chip, Box, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Функция для получения цвета типа монстра
const getTypeColor = (type) => {
    switch (type) {
        case 'гуманоид':
            return 'primary'; // Синий
        case 'зверь':
            return 'secondary'; // Фиолетовый
        case 'нежить':
            return 'error'; // Красный
        case 'дракон':
            return 'warning'; // Оранжевый
        case 'элементаль':
            return 'info'; // Голубой
        default:
            return 'default'; // Серый
    }
};

const MonsterCards = ({ monsters }) => {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const itemsPerPage = 28; // Количество заклинаний на странице
    const totalPages = Math.ceil(monsters.length / itemsPerPage);

    const startIndex = (page - 1) * itemsPerPage;
    const visibleMonster = monsters.slice(startIndex, startIndex + itemsPerPage);

    // Обработчик клика по карточке
    const handleCardClick = (monsterName) => {
        navigate(`/bestiary/${monsterName}`);
    };

    return (
        <div>
            <Grid2 container spacing={3} justifyContent="center">
                {visibleMonster.map((monster, index) => {
                    const typeColor = getTypeColor(monster.type); // Получаем цвет типа

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
                                onClick={() => handleCardClick(monster.name)}
                            >
                                <Card sx={{ height: '100%' }}>
                                    <Box sx={{ width: 300, height: 300, overflow: 'hidden', position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            src={`${process.env.PUBLIC_URL}/static/image/monsters/` + monster.imgStaticUrl}
                                            alt={monster.name}
                                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Box>

                                    <CardContent>
                                        {/* Заголовок и тип */}
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {monster.name}
                                        </Typography>
                                        <Chip
                                            label={monster.type}
                                            color={typeColor}
                                            size="small"
                                            sx={{ mb: 2 }}
                                        />

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
                                </Card>
                            </Paper>
                        </Grid2>
                    );
                })}
            </Grid2>
            <Pagination
                count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)}
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
        </div>
    );
};

export default MonsterCards;