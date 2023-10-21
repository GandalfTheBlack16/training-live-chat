import { getMessages } from '../database/repositories/MessageRepository'
import { v4 as uuid } from 'uuid'
import { type MessageOutboundEvent } from '../types'

export async function MessageListProvider (): Promise<MessageOutboundEvent[]> {
  try {
    const messageList = await getMessages()
    return messageList.map(message => {
      const { _id: id, content, author, date } = message
      return { id: id ?? uuid(), content, author, date: date ?? new Date() }
    })
  } catch (error) {
    console.log('Error fetching message from database')
    return []
  }
}
