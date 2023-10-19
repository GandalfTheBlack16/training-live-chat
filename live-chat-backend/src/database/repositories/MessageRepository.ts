import { type Message } from '../../types'
import { messageModel } from '../models/MessageModel'

export const createMessage = async ({ author, content }: Message): Promise<Message> => {
  return await messageModel.create({
    content,
    author
  })
}

export const getMessages = async (): Promise<Message[]> => {
  return await messageModel.find({ deleted: false })
}

export const deleteMessage = async (id: string): Promise<void> => {
  await messageModel.findByIdAndUpdate(id, { deleted: true })
}
