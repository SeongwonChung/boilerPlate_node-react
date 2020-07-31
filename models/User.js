const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,

    },
    email: {
        type: String,
        trim: true,//빈칸 (space) 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        minlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//schema를 model로 감싸기
const User = mongoose.model('User', userSchema)

//model을 다른파일에서도 사용할 수 있게 export
module.exports = { User }
