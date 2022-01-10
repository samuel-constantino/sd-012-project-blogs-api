const jwt = require('jsonwebtoken');

const {
    MISSING_TOKEN,
} = require('../util/erros');

const auth = async (req, res, next) => {
    const SECRET = process.env.JWT_SECRET;
    
    const token = req.headers.authorization;
    
    const { status, message } = MISSING_TOKEN;

    if (!token) return res.status(status).json({ message });
    
    try {
        const { data } = jwt.verify(token, SECRET);

        req.user = data;

        return next();
    } catch (e) {
        console.log(e.message);
        return res.status(status).json({ message: 'Expired or invalid token' });
    }
};

module.exports = auth;