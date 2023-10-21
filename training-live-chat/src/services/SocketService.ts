import { Socket, io } from "socket.io-client";

export let socket: Socket

const SERVER_URI = import.meta.env.VITE_SERVER_URI ?? 'http://localhost:3000'

export function connect(username: string) {
    socket = io(SERVER_URI, {
        auth: {
            user: username
        }
    })
}

export function disconnect() {
    socket.disconnect()
}

export function emitMessage (author: string, message: string) {
    socket.emit('create-message', { author, message })
}

export function emitDeleteMessage (messageId: string) {
    socket.emit('delete-message', { messageId })
}