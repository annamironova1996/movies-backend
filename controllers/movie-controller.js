//основная бизнес логика, которая служит посредником между моделью и интерфейсом

const Movie = require('../models/movie');

//возврат ошибок поместим в отдельную функцию
const handleError = (res, error) => {
    res.status(500).json({ error });
};

//контроллер, который будет принимать объекты запроса и ответа
const getMovies = (req, res) => {
    Movie.find()

        .sort({ title: 1 })

        .exec() //отсортируем фильмы в алфавитном порядке
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((err) => handleError(res, err));
};

const getMovie = (req, res) => {
    Movie.findById(req.params.id)
        // будем искать по id которое введено в адресную строчку браузера
        //документ, который получаем из бд, возвращаем пользователю
        .then((movie) => {
            res.status(200).json(movie);
        })

        .catch((err) => handleError(res, err));
};

const deleteMovie = (req, res) => {
    Movie.findByIdAndDelete(req.params.id) // будем искать по id которое введено в адресную строчку браузера
        //результат, который получаем из бд, возвращаем пользователю
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => handleError(res, err));
};

const addMovie = (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genres: req.body.genres,
        imageUrl: req.body.imageUrl,
    });

    movie
        .save()
        // .populate('user')
        //результат, который получаем из бд, возвращаем пользователю
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => handleError(res, err));
};

const updateMovie = (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body) // будем искать по id которое введено в адресную строчку браузера
        //результат, который получаем из бд, возвращаем пользователю
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => handleError(res, err));
};

module.exports = {
    getMovies,
    getMovie,
    deleteMovie,
    addMovie,
    updateMovie,
};
