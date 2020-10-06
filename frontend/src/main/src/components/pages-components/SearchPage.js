import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Grid from '@material-ui/core/Grid';

import getRequest from '../../utilities/getRequest'

import ProductCard from '../featured-components/ProductCard'
import Facetbar from '../sidebar-components/Facetbar'

export default function SearchPage({ query }) {

    const source = axios.CancelToken.source()
    const [result, setResult] = useState([])
    const [facetResult, setFacetResult] = useState([])
    const [formatedQuery, setformatedQuery] = useState('')
    const [filters, setFilters] = useState('')

    useEffect(() => {
        const formatedQuery = query.toLowerCase().split().join('+')
        setformatedQuery(formatedQuery)
        setFilters('')
    }, [query])


    useEffect(() => {
        const request = getRequest(`/v2/search?q=${formatedQuery}&page=0&size=24${filters}`, source)
        request()
            .then((data) => {
                setResult(data.data.content)
                setFacetResult([data.data.facetResultPages, data.data.facetFields])
            })
            .catch((error) => console.log(error))

        return () => source.cancel()
    }, [formatedQuery, filters])

    const handleFilters = (data) => {
        const ftr = Object.keys(data).map((key, i) => {
            if(key==='price') {
                return `&facet.${key}.from=${data[key][0]}&facet.${key}.to=${data[key][1]}`
            } else{
                return data[key].map(val=> `&facet.${key}=${val}`).join('')
            }
        }).join('')
        setFilters(ftr)
    }


    return (
        <Grid container spacing={0} style={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={3}>
                <div style={{ 'padding': '0px 10px' }}>
                    <Facetbar fresh={false} facetResult={facetResult} onFilterChange={handleFilters} />
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
