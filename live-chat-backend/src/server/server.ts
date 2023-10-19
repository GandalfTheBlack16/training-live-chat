import express from 'express'
import { createServer } from 'http'
import { FetchMessages } from '../controllers/MessageController'
import cors from 'cors'
import { Server } from 'socket.io'
import { CreateMessageHandler, DeleteMessageHandler } from '../handlers/MessageEventsHandler'

const port = process.env.PORT ?? 3000
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log(`User ${socket.handshake.auth.user} has connected!`)

  socket.on('disconnect', () => {
    console.log(`User ${socket.handshake.auth.user} has disconnected!`)
  })

  socket.on('create-message', CreateMessageHandler)
  socket.on('delete-message', DeleteMessageHandler)
})

app.use(cors())

app.get('/api/messages', FetchMessages)

const initServer = (): void => {
  httpServer.listen(port, () => {
    console.log('Training Chat pplication listening on port', port)
  })
}

export { initServer, httpServer, io }
