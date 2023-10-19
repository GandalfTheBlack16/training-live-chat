import { Server } from 'socket.io'
import { httpServer } from './httpServer'

const io = new Server(httpServer)

io.on('connection', (socket) => {
  console.log('Socket Server: User connected')
})

export { io }
