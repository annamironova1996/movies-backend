//фукция которая проверит можно ли давать доступ пользователю чтобы узнать о себе
const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            //расшифровать токен
            const decoded = jwt.verify(token, '123');

            req.userId = decoded._id;
            next();
        } catch (error) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа',
        });
    }
};

module.exports = checkAuth;
