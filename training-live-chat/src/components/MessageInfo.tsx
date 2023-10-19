import { Message } from "../types"

export function MessageInfo ({ author, content, date, itsMe }: Pick<Message, 'author' | 'content' | 'date'> & {itsMe: boolean}) {

    const timeFormat = new Date(date).toLocaleTimeString()
    const dateFormat = new Date(date).toLocaleDateString()

    return (

        <article className="bg-slate-500 px-2 py-4 rounded-lg text-left flex gap-6 justify-stretch items-center">
            <span className="text-xs">{dateFormat} {timeFormat} </span>
            <span className="text-base"><b>{itsMe ? 'Me' : author}</b> &gt; {content}</span>
        </article>

    )
}