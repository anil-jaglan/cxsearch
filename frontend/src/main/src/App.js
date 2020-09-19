import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';

import Sidebar from './components/sidebar-components/Sidebar.js'
import Logo from './components/sidebar-components/Logo.js'
import NavList from './components/sidebar-components/NavList.js'
import NavItem from './components/sidebar-components/NavItem.js'
import PlayLists from './components/sidebar-components/PlayLists.js'
import FeaturedPlaylist from './components/sidebar-components/FeaturedPlaylist.js'
import FeaturedItem from './components/sidebar-components/FeaturedItem.js'
import OtherPlaylist from './components/sidebar-components/OtherPlaylist.js'
import InstallCTA from './components/sidebar-components/InstallCTA.js'
import Footer from './components/footer-components/Footer.js'
import CTAbanner from './components/footer-components/CTAbanner'
import Player from './components/footer-components/Player'
import Featured from './components/featured-components/Featured.js'
import Loading from './components/featured-components/Loading.js'


import getHashParams from './utilities/getHashParams'
import reqWithToken from './utilities/reqWithToken'
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


  const playerRef = useRef(null)
  const updatePlayer = () => {
    playerRef.current.updateState()
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
                  <HomePage loggedIn={loggedIn} message={message} status={status}/>
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
