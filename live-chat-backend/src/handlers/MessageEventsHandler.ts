import { type MessageEvent } from '../types'
import { createMessage, deleteMessage } from '../database/repositories/MessageRepository'
import { io } from '../server/server'

export async function CreateMessageHandler ({ author, message }: MessageEvent): Promise<void> {
  try {
    const { _id, content, author: _author, date } = await createMessage({ author, content: message })
    io.emit('message-created', { id: _id, content, author: _author, date })
  } catch (error) {
    console.log('Error handling create-message event', error)
    io.emit('status-event', { message: 'Error registering the message', cause: error })
  }
}

export async function DeleteMessageHandler ({ messageId }: { messageId: string }): Promise<void> {
  try {
    await deleteMessage(messageId)
    io.emit('message-deleted', { id: messageId })
  } catch (error) {
    console.log('Error handling delete-message event', error)
    io.emit('status-event', { message: 'Error deleting the message', cause: error })
  }
}
