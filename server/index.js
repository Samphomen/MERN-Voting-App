require('dotenv').config();
const express = require('express')
const app = express();

// rest of the packages
const cors = require('cors')
const bodyParser = require('body-parser')


// database
const connectDB = require('./db/connect');

// middlewares
const handler = require('./handlers')

//routers
const authRouter = require('./routes/auth')
const pollRouter = require('./routes/poll')

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => res.json({ hello: 'world' }))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/polls', pollRouter)

app.use(handler.notFound)
app.use(handler.error)

const port = process.env.PORT
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
