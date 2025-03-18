// Функция для получения цвета типа монстра
export const getTypeColor = (type) => {
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