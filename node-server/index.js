const io = require('socket.io')(8000)
const express = require('express')
const app = express();
const connectToMongo = require('./db.js')
app.use(express.json())
connectToMongo()
let cors = require("cors");
app.use(cors());
const msgroutes = require('./routes/msg_route')
app.use('/api/chat', msgroutes)

const users = {}

//io.on is a socket instance that listens for connections
io.on('connection', socket => {

    //handles a connection
    socket.on('new-user-joined', name => {
        console.log('new user', name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    })

    socket.on('send', message => {
        socket.broadcast.emit('message recieved', {
            message: message,
            name: users[socket.id]
        })

    })
})

app.listen(5000, () => {
    console.log('object')
})