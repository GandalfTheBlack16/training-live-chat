import { type Request, type Response } from 'express'
import { getMessages } from '../database/repositories/MessageRepository'

export function FetchMessages (req: Request, res: Response): void {
  getMessages()
    .then(messageList => {
      res.json({
        messages: messageList.map(i => {
          const { _id: id, author, content, date } = i
          return { id, author, content, date }
        })
      })
    })
    .catch(err => {
      console.log('Error getting messages from database', err)
      res.status(500).json({
        error: err
      })
    })
}
