import { Schema, model } from 'mongoose'
import { type Message } from '../../types'
import { v4 as uuid } from 'uuid'

const messageSchema = new Schema<Message>({
  _id: {
    type: String,
    default: uuid
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  }
})

const messageModel = model('Message', messageSchema)

export { messageModel }
