export const getSchoolColor = (school) => {
    switch (school.toLowerCase()) {
        case 'вызов':
            return 'primary'; // Синий
        case 'иллюзия':
            return 'secondary'; // Фиолетовый
        case 'ограждение':
            return 'success'; // Зеленый
        case 'некромантия':
            return 'error'; // Красный
        case 'преобразование':
            return 'warning'; // Оранжевый
        case 'очарование':
            return 'info'; // Голубой
        case 'прорицание':
            return 'default'; // Серый
        default:
            return 'default'; // По умолчанию
    }
};

export const getLevelText = (level) => {
    if (level > 0) {
        return `Уровень: ${level}`
    } else {
        return 'Заговор'
    }
};