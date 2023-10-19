import { SyntheticEvent, useEffect, useState } from "react"
import { Message } from "../types"
import { MessageInfo } from "./MessageInfo"
import { emitMessage, socket } from "../services/SocketService"

interface Props {
    username: string
}

export function Chat ({ username }: Props) {

    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState<string>('')

    useEffect(() => {
        fetch('http://localhost:3000/api/messages')
        .then(response => response.json())
        .then(data => {
            setMessages(data.messages)
        })
        .catch(error => {
            console.log('Error fetching messages', error)
        })

        socket.on('message-created', (message: Message) => {
            setMessages(curr => [...curr, message])
        })
    }, [])

    const onInputChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement
        setNewMessage(target.value)
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
        setNewMessage('')
        emitMessage(username, newMessage)
    }

    const sortedMessageByDate = messages.sort((a,b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

    return (
        <main className="border-2 border-slate-800 bg-slate-600 rounded-lg w-600 flex flex-col p-4 gap-6">
            <ul className="flex flex-col gap-4">
                {
                    sortedMessageByDate.map(item => {
                        return <li key={item.id}>
                            <MessageInfo 
                                author={item.author}
                                content={item.content}
                                date={item.date}
                                itsMe={item.author === username}
                            />
                        </li>
                    })
                }
            </ul>
            <form 
                onSubmit={handleSubmit}
                className="w-full flex flex-row justify-between px-2"
            >
                <input
                    className="w-5/6 rounded-full px-4 py-2"
                    type="text"
                    value={newMessage}
                    onChange={onInputChange}
                    placeholder="Message..."
                />
                <input 
                    className="px-6 py-2 rounded-full bg-sky-800 border-1 border-slate-900 cursor-pointer hover:bg-sky-700 hover:border-slate-600"
                    type="submit" 
                    value="Send"
                />
            </form>
        </main>
    )
}