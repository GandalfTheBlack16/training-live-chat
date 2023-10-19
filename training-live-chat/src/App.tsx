import { useState } from 'react'
import './App.css'
import { Login } from './components/Login'
import { Header } from './components/Header'
import { Chat } from './components/Chat'
import { disconnect } from './services/SocketService'

function App() {
  const [userLogged, setUserLogged] = useState<string>('')

  const handleSubmit = (username: string) => {
    setUserLogged(username)
  }

  const handleLogout = () => {
    setUserLogged('')
    disconnect()
  }

  return (
    <>
      {
        !userLogged ? 
        <Login 
          onSubmit={handleSubmit}
        /> :
        (
          <>
            <Header 
              userLogged={userLogged}
              handleLogout={handleLogout}
            />
            <Chat 
              username={userLogged}
            />
          </>
        )
      }
    </>
  )
}

export default App
