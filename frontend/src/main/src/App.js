import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { SnackbarProvider } from 'notistack';

import Footer from './components/footer-components/Footer.js'
import Loading from './components/featured-components/Loading.js'

import getHashParams from './utilities/getHashParams'
import { UserContext, LoginContext, TokenContext, MessageContext, PlayContext } from './utilities/context'
import HomePage from './components/pages-components/HomePage.js';

function App() {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setloggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfo, setuserInfo] = useState({})

  const [status, setStatus] = useState(false)
  const [message, setMessage] = useState('')

  const timerRef = useRef(null)

  useEffect(() => {
    var params = getHashParams();
    const { access_token, error } = params

    var cancelSource = Axios.CancelToken.source()
    if (error) {
      setLoading(false)
      setStatusMessage(`ERROR: ${error}`)
    }
    setLoading(false)
    return (() => {
      cancelSource.cancel()
      clearTimeout(timerRef.current)
    })
  }, [])

  const setStatusMessage = (message) => {
    clearTimeout(timerRef.current)
    setStatus(true)
    setMessage(message)
    timerRef.current = setTimeout(() => {
      setStatus(false)
    }, 3000)
  }


  return (
    <div className="App">
      {loading ?
        <Loading type='app' /> :
        <MessageContext.Provider value={setStatusMessage}>
          <LoginContext.Provider
            value={loggedIn}>
            <TokenContext.Provider value={token}>
              <UserContext.Provider value={userInfo}>
                <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'bottom',horizontal: 'center',}} preventDuplicate>
                  <HomePage loggedIn={loggedIn} message={message} status={status} />
                </SnackbarProvider>
              </UserContext.Provider>
            </TokenContext.Provider>
            <Footer />
          </LoginContext.Provider>
        </MessageContext.Provider>
      }
    </div>
  );
}



export default App;
