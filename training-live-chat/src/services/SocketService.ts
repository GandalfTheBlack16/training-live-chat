import { Socket, io } from "socket.io-client";

export let socket: Socket

export function connect(username: string) {
    socket = io('http://localhost:3000', {
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