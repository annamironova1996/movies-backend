const { body } = require('express-validator');

const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({
        min: 5,
    }),
    body('fullName', 'Укажите имя').isLength({ min: 2 }),
    body('avatar', 'Неверная ссылка на аватар').optional().isURL(), // опционально, но если придет, пусть проверит ссылка это или нет
];
const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({
        min: 5,
    }),
];

const movieCreateValidation = [
    body('title', 'Введите название фильма').isLength({ min: 3 }).isString(),
    body('director', 'Введите имя режисера').isLength({ min: 3 }).isString(),
    body('year', 'Введите год выпуска фильма').isLength({ min: 4 }),
    body('genres', 'Укажите жанр или список жанров').optional(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];

module.exports = { registerValidator, loginValidator, movieCreateValidation };
