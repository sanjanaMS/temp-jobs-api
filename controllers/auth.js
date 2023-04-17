const User = require('../models/User');
const statusCode = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/index');
const { use } = require('../routes/auth');

const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide name,email and passsword')
    }
    const user = await User.create({ ...req.body })
    const token = await user.getToken()
    res.status(statusCode.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {


    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('provide valid credentials')
    }
    console.log(password);
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('user not found with email')
    }
    const isPresesnt = await user.comparePassword(password)
    if (!isPresesnt) {
        throw new UnauthenticatedError('password incorrect')
    }
    const token = await user.getToken()

    res.status(statusCode.OK).json({ user: { name: user.name }, token })

}

module.exports = {
    register, login
}