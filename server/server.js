const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')

const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server)

const SERVER_HOST = 'localhost'
const SERVER_PORT = '8080'

io.on('connection', socket => {
    console.log('CONSEGUIU CONECTAR')
    socket.on('onClick', (data) => {
        console.log('onClick', data)
    })

    socket.on('onClickBroadcast', (data) => {
        console.log('onClickBroadcast', data)
        socket.broadcast.emit('messageBroadcast', data)
    })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log('ENTROU NO SERVER')
})
