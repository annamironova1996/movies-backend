//файл для создания схемы
const mongoose = require('mongoose');

//вытягиваем в переменную конструктор схема
const Schema = mongoose.Schema;

//создаем схему
const movieSchema = new Schema({
    title: {
        type: String, //тип строка
        required: true, //заполнение обязательно
    },
    director: {
        type: String, //тип строка
        required: true, //заполнение обязательно
    },
    year: {
        type: Number, //тип число
        required: true, //заполнение обязательно
    },
    genres: {
        type: String, //тип строка
        required: true, //заполнение обязательно
    }, // тип строка

    imageUrl: {
        type: String,
        required: true, //заполнение обязательно
    },
});

//создаем имя модели и передаем два параметра : 1 - имя модели, 2 - имя схемы, котрую мангус будет искать
const Movie = mongoose.model('Movie', movieSchema);

//экспортируем модель из файла
module.exports = Movie;
