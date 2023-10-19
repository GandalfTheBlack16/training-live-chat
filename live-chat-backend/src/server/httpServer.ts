import express from 'express'
import { createServer } from 'http'

const port = process.env.PORT ?? 3000
const app = express()
const httpServer = createServer(app)

const initServer = (): void => {
  httpServer.listen(port, () => {
    console.log('Training Chat pplication listening on port', port)
  })
}

export { initServer, httpServer }
