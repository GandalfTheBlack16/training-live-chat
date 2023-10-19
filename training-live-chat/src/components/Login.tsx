import { SyntheticEvent, useState } from "react"
import { connect } from "../services/SocketService"

interface Props {
    onSubmit: (username: string) => void
}

export function Login ({ onSubmit }: Props) {

    const [username, setUsername] = useState<string>('')

    const usernameChangeHandler = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement
        setUsername(target.value)
    }

    const submitHandler = (event: SyntheticEvent) => {
        event.preventDefault()
        connect(username)
        onSubmit(username)
    }

    return (
        <div className="p-8 flex flex-col justify-between gap-4">
            <h1 className="text-2xl">Log with your nick</h1>
            <form onSubmit={submitHandler} className="flex flex-col gap-2">
                <input 
                    type="text" 
                    className="rounded-full px-4 py-2 border-2 border-slate-600 hover:border-slate-300 text-center"
                    placeholder="Username"
                    value={username}
                    onChange={usernameChangeHandler}
                />
                <input
                    className="rounded-full px-4 py-2 border-2 border-slate-600 hover:border-slate-300 cursor-pointer"
                    type="submit"
                    value='Login'
                />
            </form>
        </div>
    )
}