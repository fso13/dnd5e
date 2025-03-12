import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Divider, Chip, CardMedia } from '@mui/material';

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

const MonsterDetailPage = ({ monsters }) => {
    const { monsterName } = useParams(); // Получаем имя монстра из URL
    const monster = monsters.find(monster => monster.name === monsterName); // Находим монстра по имени

    if (!monster) {
        return <Typography variant="h4">Монстр не найден</Typography>;
    }

    return (
        <Box sx={{ padding: 3, maxWidth: 800, margin: '0 auto' }}>
            <Paper elevation={3} sx={{ padding: 3 }}>



                <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                    {/* Заголовок и тип */}
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {monster.name}
                    </Typography>

                    {/* Метка "Дополнение" */}
                    <Chip
                        label={monster.type} color={getTypeColor(monster.type)}
                        sx={{ position: 'absolute', top: 10, right: 10 }}
                    />
                </Box>
                <CardMedia
                    component="img"
                    src={`${process.env.PUBLIC_URL}/static/image/monsters/` + monster.imgStaticUrl}
                    alt={monster.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
                <Divider sx={{ my: 3 }} />

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