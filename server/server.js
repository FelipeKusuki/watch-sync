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

    socket.on('addVideo', (data) => {
        io.emit('receiveAddVideo', data)
    })

    socket.on('endVideo', () => {
        io.emit('receiveEndVideo')
    })

    socket.on('playOrPause', (data) => {
        console.log('playOrPause', data)
        // Talvez so precise de apenas um desses emit
        // socket.broadcast.emit('messageBroadcast', data)
        io.emit('receivePlayOrPause', data)
    })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log('ENTROU NO SERVER')
})
