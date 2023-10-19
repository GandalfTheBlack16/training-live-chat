interface Props {
    userLogged: string
    handleLogout: () => void
}

export function Header ({userLogged, handleLogout}: Props) {

    return (
        <nav className='p-6 flex flex-row gap-6 items-center justify-end'>
            <span>Logged as <b>{userLogged}</b></span>
            <button 
              className='px-6 py-2 rounded-full bg-sky-600 border-1 border-slate-700 cursor-pointer hover:bg-sky-700 hover:border-slate-600'
              onClick={handleLogout}
            >Log out</button>
          </nav>
    )
}