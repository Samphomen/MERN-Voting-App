const { register, login } = require('./auth')
const { showPolls, createPoll, usersPolls, getPoll, deletePoll, vote } = require('./poll')

const notFound = (req, res, next) => {
    const err = new Error('Not found');
    err.status = 404

    next(err);
}

const error = (err, req, res, next) => {
    res.status(err.status || 400).json({
        message: err.message || 'Something went wrong'
    })
}

module.exports = {
    error,
    notFound,
    register,
    login,
    showPolls,
    createPoll,
    usersPolls,
    getPoll,
    deletePoll,
    vote
}