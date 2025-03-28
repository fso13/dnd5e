export const getTypeColor = (type) => {
    const typeColors = {
        'гуманоид': 'primary', // Синий
        'зверь': 'secondary', // Фиолетовый
        'нежить': 'error', // Красный
        'дракон': 'warning', // Оранжевый
        'элементаль': 'info', // Голубой
        'аберрация': 'default', // Серый
        'растение': 'success', // Зеленый
        'небожитель': 'primary', // Синий
        'исчадие': 'error', // Красный
        'конструкт': 'secondary', // Фиолетовый
        'монстр': 'default', // Серый
        'фея': 'info', // Голубой
        'демон': 'error', // Красный
        'рой крошечных зверей': 'secondary', // Фиолетовый
        'великан': 'warning', // Оранжевый
        'слизь': 'success', // Зеленый
    };

    // Возвращаем цвет по типу или значение по умолчанию, если тип не найден
    return typeColors[type] || 'default';
};