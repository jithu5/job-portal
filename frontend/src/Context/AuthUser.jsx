import React, { createContext } from 'react'

const AuthUserContext = createContext({

})

function AuthUserContextProvider({children}) {

    const [user, setUser] = React.useState(null)
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [message, setMessage] = React.useState("")

    const AuthContextValue = {
        
    }
  return (
    <AuthUserContext.Provider value={AuthContextValue}>
      {children}
    </AuthUserContext.Provider>
  )
}

export {AuthUserContextProvider, AuthUserContext}
