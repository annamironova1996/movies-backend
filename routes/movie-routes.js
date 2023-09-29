//здесь все роуты, которые делают запросы на бд

const express = require('express');

//для генерации токена
const jwt = require('jsonwebtoken');

//для шифрования пароля
const bcrypt = require('bcrypt');

//для загрузки файлов
const multer = require('multer');

//хранилище, в котором будем сохранять картинки
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

const {
    registerValidator,
    loginValidator,
    movieCreateValidation,
} = require('../validations/validations');

const UserModel = require('../models/user');

const checkAuth = require('../utils/checkAuth');

const {
    getMovies,
    getMovie,
    deleteMovie,
    addMovie,
    updateMovie,
} = require('../controllers/movie-controller');

//мини приложение, которое будет работать с запросами
const router = express.Router();

const handleValidationErrors = require('../utils/handleValidationErrors');

//запрос на регистрацию
router.post(
    '/register',
    registerValidator,
    handleValidationErrors,
    async (req, res) => {
        try {
            //шифруем пароль
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const doc = new UserModel({
                email: req.body.email,
                fullName: req.body.fullName,
                avatarUrl: req.body.avatarUrl,
                passwordHash: hash,
            });

            //создаем юзера
            const user = await doc.save();

            //создаем токен
            const token = jwt.sign(
                {
                    _id: user._id,
                },
                '123',
                {
                    expiresIn: '30d', //токен будет 30 дней
                }
            );

            const { passwordHash, ...userData } = user._doc;

            res.json({
                ...userData,
                token,
            });
        } catch (error) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось зарегистрироваться',
            });
        }
    }
);

//запрос на авторизацию
router.post(
    '/login',
    loginValidator,
    handleValidationErrors,
    async (req, res) => {
        try {
            const user = await UserModel.findOne({
                email: req.body.email,
            });
            if (!user) {
                return res.status(400).json({
                    message: 'Пользователь не найден',
                });
            }
            const isValidPass = await bcrypt.compare(
                req.body.password,
                user._doc.passwordHash
            );

            if (!isValidPass) {
                return res.status(400).json({
                    message: 'Неверный логин или пароль',
                });
            }
            //создаем токен
            const token = jwt.sign(
                {
                    _id: user._id,
                },
                '123',
                {
                    expiresIn: '30d', //токен будет 30 дней
                }
            );
            const { passwordHash, ...userData } = user._doc;

            res.json({
                ...userData,
                token,
            });
        } catch (error) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось авторизоваться',
            });
        }
    }
);

router.get('/me', checkAuth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        //если юзер нашелся
        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (error) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
});

router.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

//запрашиваем данные из бд
router.get('/movies', getMovies);

//получить 1 фильм по его id
router.get('/movies/:id', getMovie);

//удвлить 1 фильм по его id
router.delete('/movies/:id', deleteMovie);

//добавляем 1 фильм
router.post(
    '/movies',
    // checkAuth,
    movieCreateValidation,
    handleValidationErrors,
    addMovie
);

//обновляем 1 фильм
router.patch(
    '/movies/:id',
    // checkAuth,
    movieCreateValidation,
    handleValidationErrors,
    updateMovie
);

module.exports = router;
