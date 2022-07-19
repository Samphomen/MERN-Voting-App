const User = require('../models/User')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        const { id, username } = user
        const token = jwt.sign({ id, username }, process.env.JWT_SECRET)
        res.status(201).json({ id, username, token })
    } catch (error) {
        if (error.code === 11000) {
            error.message = 'Sorry, that username is already taken'
        }
        return next({
            status: 400,
            message: error.message,
        });
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        const { id, username } = user
        const isPasswordValid = await user.comparePassword(req.body.password)
        if (!isPasswordValid) {
            throw new Error();
        }
        const token = jwt.sign({ id, username }, process.env.JWT_SECRET)
        res.status(201).json({ id, username, token })
    } catch (error) {
        return next({ status: 400, message: 'Invalid Username/Password' });
    }
}

module.exports = { register, login }