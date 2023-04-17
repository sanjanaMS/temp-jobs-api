const user = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/')
const auth = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer')) {
        throw new UnauthenticatedError('authentication invalid')
    }
    const token = header.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        req.user = { userId: payload.userId, name: payload.name }
        next()
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid')
    }
}

module.exports = auth