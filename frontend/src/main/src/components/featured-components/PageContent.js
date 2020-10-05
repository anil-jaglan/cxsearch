import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import SearchPage from '../pages-components/SearchPage'
import ProductPage from '../pages-components/ProductPage'

import { LoginContext } from '../../utilities/context'

export default function PageContent({ query, message, status }) {
    const loggedIn = useContext(LoginContext)

    return (
        <>
            <Switch>
                <Route path='/product'>
                    <ProductPage />
                </Route>
                <Route exact path='/'>
                    <SearchPage query={query} />
                </Route>
            </Switch>
            <div className={`status-bar-wrapper ${status ? 'active' : ''}`}>
                <div className={`status-bar ${status ? 'active' : ''}`}>{message}</div>
            </div>
        </>
    )
}
