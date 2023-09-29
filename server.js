// корневой файл сервера

const mongoose = require('mongoose');

const express = require('express');

const cors = require('cors');

const Movie = require('./models/movie');

//импортируем роутер
const movieRoutes = require('./routes/movie-routes');

//определяем порт, на котором будет работать сервер
const PORT = 4444;
//порт по которому работает монгодб
const URL =
    'mongodb+srv://admin:89bg3FNFXHd3rIMn@cluster0.mec4qrg.mongodb.net/moviebox?retryWrites=true&w=majority';

//инициализируем создание приложения/сервера
const app = express();

//чтобы получить инфо, хранящуюся в боди, делаем мидлвар из экспресс
app.use(express.json());

//чтобы экспресс видел статичные файлы
app.use('/uploads', express.static('uploads'));
app.use(cors());

//интегрируем это мини приложение в основную логику сервера
app.use(movieRoutes);

//подключаемся к бд
mongoose
    .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected to MongoDB'))
    .catch((err) => сonsole.log(`DB connection error: ${err}`));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`);
});
