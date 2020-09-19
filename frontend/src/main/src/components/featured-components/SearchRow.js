import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Grid from '@material-ui/core/Grid';

import getRequest from '../../utilities/getRequest'

import SearchRowTitle from './SearchRowTitle'
import SearchRowGrid from './SearchRowGrid'

export default function SearchRow({ title, type, query }) {
    const source = axios.CancelToken.source()
    const [result, setResult] = useState([])
    const [formatedQuery, setformatedQuery] = useState('')

    useEffect(() => {
        const formatedQuery = query.toLowerCase().split().join('+')
        setformatedQuery(formatedQuery)
    }, [query])


    useEffect(() => {
        const request = getRequest(`/search?q=${formatedQuery}&page=0&size=10`, source)
        request()
            .then((data) => {
                setResult(data.data.content)
            })
            .catch((error) => console.log(error))

        return () => source.cancel()
    }, [formatedQuery, type])


    return (
        <>
            <Grid item sm={12}>
                {/* <SearchRowTitle title={title}/> */}
                <SearchRowGrid type={type} info={result} />
            </Grid>
        </>
    )
}
