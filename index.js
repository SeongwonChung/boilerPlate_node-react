const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')

//mongo DB key 정보 가져오기
const config = require('./config/key')

const { User } = require('./models/User')

//application/x-www-form-urlencoded 형태를 분석해서 가져오게 해줌
app.use(bodyParser.urlencoded({ extended: true }))
//json 형태를 분석해서 가져오게 해줌
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World! seongwon Chung'))

//회원가입 위한 라우트
app.post('/register', (req, res) => {
    //회원가입시 필요한 정보들을 client에서 가져오면 
    //그 정보를 DB에 넣어준다.

    const user = new User(req.body)

    //mongo DB method
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            succss: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))