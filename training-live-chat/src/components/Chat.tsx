import { SyntheticEvent, useEffect, useState } from "react"
import { Message } from "../types"
import { MessageInfo } from "./MessageInfo"
import { emitDeleteMessage, emitMessage, socket } from "../services/SocketService"

interface Props {
    username: string
}

export function Chat ({ username }: Props) {

    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState<string>('')

    useEffect(() => {

        socket.on('get-messages', (messages: Message[]) => {
            setMessages(messages)
        })

        socket.on('message-created', (message: Message) => {
            setMessages(curr => [...curr, message])
        })

        socket.on('message-deleted', ({ id }: { id: string }) => {
            setMessages(curr => curr.filter(i => i.id !== id))
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

    const handleDeleteMessage = (id: string) => {
        emitDeleteMessage(id)
    }

    const sortedMessageByDate = messages.sort((a,b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

    return (
        <main className="border-2 border-slate-800 bg-slate-600 rounded-lg w-600 flex flex-col p-4 gap-6">
            {
                sortedMessageByDate.length === 0 ? 
                <p className="p-2 text-lg font-medium">There are not messages in this chat</p> :
                <ul className="flex flex-col gap-4">
                    {
                        sortedMessageByDate.map(item => {
                            return <li key={item.id}>
                                <MessageInfo 
                                    author={item.author}
                                    content={item.content}
                                    date={item.date}
                                    itsMe={item.author === username}
                                    deleteButtonHandler={() => {
                                        handleDeleteMessage(item.id)
                                    }}
                                />
                            </li>
                        })
                    }
                </ul>
            }
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