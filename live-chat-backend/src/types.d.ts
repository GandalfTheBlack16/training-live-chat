export interface Message {
  _id?: string
  content: string
  author: string
  date?: Date
  deleted?: boolean
}

export interface User {
  _id?: string
  username: string
}

export interface MessageEvent {
  author: string
  message: string
}
