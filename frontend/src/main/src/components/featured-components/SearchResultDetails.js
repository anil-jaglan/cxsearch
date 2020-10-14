import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'

export default function SearchResultDetails({ query, result }) {

    const [from, setFrom] = useState(1)
    const [to, setTo] = useState(24)

    useEffect(() => {
        setFrom(result.number * result.size + 1)
        let t = (result.number + 1) * result.size
        t = t < result.totalElements ? t : result.totalElements
        setTo(t)
        if(result.totalElements==0) {
            setFrom(0)
        }
    }, [result])

    return (
        <Typography>Displaying {from} to {to} of {result.totalElements} {query !== '' && <span>results for <strong style={{ color: "#D71440" }}>{query}</strong></span>} </Typography>
    )
}