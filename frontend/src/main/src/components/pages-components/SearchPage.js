import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Grid from '@material-ui/core/Grid';

import getRequest from '../../utilities/getRequest'

import ProductCard from '../featured-components/ProductCard'
import FacetCard from '../featured-components/FacetCard';

export default function SearchPage({ query }) {
    const source = axios.CancelToken.source()
    const [result, setResult] = useState([])
    const [facetResult, setFacetResult] = useState([])
    const [formatedQuery, setformatedQuery] = useState('')

    useEffect(() => {
        const formatedQuery = query.toLowerCase().split().join('+')
        setformatedQuery(formatedQuery)
    }, [query])


    useEffect(() => {
        const request = getRequest(`/search?q=${formatedQuery}&page=0&size=24`, source)
        request()
            .then((data) => {
                setResult(data.data.content)
                console.log(data.data)
                setFacetResult([data.data.facetResultPages, data.data.facetFields])
            })
            .catch((error) => console.log(error))

        return () => source.cancel()
    }, [formatedQuery])


    return (
        <Grid container spacing={0} style={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={3}>
                <div style={{'padding' : '0px 10px'}}>
                {facetResult.length >0 ? facetResult[0].map((page, i) => <FacetCard title={facetResult[1][i].name} content={page.content} />) : null}
                </div>
            </Grid>
            <Grid item xs={12} sm={9}>
                <Grid container spacing={3} style={{ width: '100%' }}>
                    {result.map((item) =>
                        <ProductCard key={item.id} product={item} />
                    )}
                </Grid>
            </Grid>
        </Grid>
    )
}
