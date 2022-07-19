const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    polls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    }]
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next()
        }
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        return next(err)
    }
})

UserSchema.methods.comparePassword = async function (attempt, next) {
    try {
        const isMatch = await bcrypt.compare(attempt, this.password)
        return isMatch
    } catch (error) {
        next(err)
    }
}



module.exports = mongoose.model('User', UserSchema)