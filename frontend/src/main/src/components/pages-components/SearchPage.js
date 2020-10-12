import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import Grid from '@material-ui/core/Grid';

import getRequest from '../../utilities/getRequest'

import ProductCard from '../featured-components/ProductCard'
import Facetbar from '../sidebar-components/Facetbar'
import SortingIcon from '../featured-components/SortingIcon';

export default function SearchPage({ query }) {

    const source = axios.CancelToken.source()
    const [result, setResult] = useState([])
    const [formatedQuery, setformatedQuery] = useState('')
    const [filters, setFilters] = useState('')
    const [sortOrder, setSortOrder] = useState('')

    useEffect(() => {
        const formatedQuery = query.toLowerCase().split().join('+')
        setformatedQuery(formatedQuery)
        setFilters('')
    }, [query])


    useEffect(() => {
        const order = sortOrder === '' ? sortOrder : `sort.order=${sortOrder}`;
        const request = getRequest(`/v2/search?q=${formatedQuery}&page=0&size=24${filters}&${order}`, source)
        request()
            .then((data) => {
                setResult(data.data)
            })
            .catch((error) => console.log(error))

        return () => source.cancel()
    }, [formatedQuery, filters, sortOrder])

    const handleFilters = (data) => {
        const ftr = Object.keys(data).map((key, i) => {
            if (key === 'price') {
                return `&facet.${key}.from=${data[key][0]}&facet.${key}.to=${data[key][1]}`
            } else {
                return data[key].map(val => `&facet.${key}=${val}`).join('')
            }
        }).join('')
        setFilters(ftr)
    }

    const handleSorting = (order) => {
        setSortOrder(order)
    }


    return (
        <Grid container spacing={0} style={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={3}>
                <div style={{ 'padding': '0px 10px' }}>
                    <Facetbar fresh={false} result={result} onFilterChange={handleFilters} />
                </div>
            </Grid>
            <Grid item xs={12} sm={9}>
                <Grid container>
                    <Grid item xs={9}></Grid>
                    <Grid item xs={3} alignContent="flex-end" style={{ cursor: 'pointer' }}>
                        <SortingIcon onChange={handleSorting} />
                        <ViewListIcon fontSize="large" />
                        <ViewModuleIcon fontSize="large" color="secondary" />
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{ width: '100%' }}>
                    {result.content && result.content.map((item) =>
                        <ProductCard key={item.id} product={item} />
                    )}
                </Grid>
            </Grid>
        </Grid>
    )
}
