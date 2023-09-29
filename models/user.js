//файл для создания схемы юзеров
const mongoose = require('mongoose');

//вытягиваем в переменную конструктор схема
const Schema = mongoose.Schema;

//создаем схему
const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true, //обязательное
        },
        email: {
            type: String,
            required: true,
            unique: true, //уникальная
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatarUrl: String,
    },
    {
        timestamps: true, //схема автоматически прикрутит дату создания и обновления
    }
);

//создаем имя модели и передаем два параметра : 1 - имя модели, 2 - имя схемы, котрую мангус будет искать
const User = mongoose.model('User', userSchema);

//экспортируем модель из файла
module.exports = User;
