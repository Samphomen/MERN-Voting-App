const express = require('express')
const router = express.Router()

const { showPolls, createPoll, usersPolls, getPoll, deletePoll, vote } = require('../handlers')
const { fullAuth } = require('../middlewares/authentication')

router
    .route('/')
    .get(showPolls)
    .post(fullAuth, createPoll)

router
    .route('/user')
    .get(fullAuth, usersPolls)


router
    .route('/:id')
    .get(getPoll)
    .post(fullAuth, vote)
    .delete(fullAuth, deletePoll)

module.exports = router