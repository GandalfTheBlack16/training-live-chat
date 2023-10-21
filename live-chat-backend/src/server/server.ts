import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { CreateMessageHandler, DeleteMessageHandler } from '../handlers/MessageEventsHandler'
import { MessageListProvider } from '../providers/MessageProvider'

const port = process.env.PORT ?? 3000
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', async (socket) => {
  console.log(`User ${socket.handshake.auth.user} has connected!`)

  socket.emit('get-messages', await MessageListProvider())

  socket.on('disconnect', () => {
    console.log(`User ${socket.handshake.auth.user} has disconnected!`)
  })

  socket.on('create-message', CreateMessageHandler)
  socket.on('delete-message', DeleteMessageHandler)
})

const initServer = (): void => {
  httpServer.listen(port, () => {
    console.log('Training Chat pplication listening on port', port)
  })
}

export { initServer, httpServer, io }
