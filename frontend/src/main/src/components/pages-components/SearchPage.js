import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import Grid from '@material-ui/core/Grid';

import getRequest from '../../utilities/getRequest'

import ProductCard from '../featured-components/ProductCard'
import Facetbar from '../sidebar-components/Facetbar'
import SortingPanel from '../featured-components/SortingPanel';
import SearchPagination from '../featured-components/SearchPagination';
import SearchResultDetails from '../featured-components/SearchResultDetails';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function SearchPage({ query }) {
    const classes = useStyles()
    const source = axios.CancelToken.source()
    const [result, setResult] = useState([])
    const [formatedQuery, setformatedQuery] = useState('')
    const [filters, setFilters] = useState('')
    const [sort, setSort] = useState(['score', 'desc'])
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(0)
    const size = 24

    useEffect(() => {
        const formatedQuery = query.toLowerCase().split().join('+')
        setformatedQuery(formatedQuery)
        setFilters('')
        setPage(0)
    }, [query])


    useEffect(() => {
        setOpen(true)
        const request = getRequest(`/v2/search?q=${formatedQuery}&page=${page}&size=${size}${filters}&sort.field=${sort[0]}&sort.order=${sort[1]}`, source)
        request()
            .then((data) => {
                setOpen(false)
                setResult(data.data)
            })
            .catch((error) => console.log(error))

        return () => source.cancel()
    }, [formatedQuery, filters, sort, page])

    const handleFilters = (data) => {
        const fltr = Object.keys(data).map((key, i) => {
            if (key === 'price') {
                return `&facet.${key}.from=${data[key][0]}&facet.${key}.to=${data[key][1]}`
            } else {
                return data[key].map(val => `&facet.${key}=${val}`).join('')
            }
        }).join('')
        setFilters(fltr)
    }

    const handleSorting = (order) => {
        setSort(order.split(','))
    }

    const onPageChange = (page) => {
        setPage(page-1)
    }

    return (
        <Grid container spacing={0} style={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={3}>
                <div style={{ 'padding': '0px 10px' }}>
                    <Facetbar reset={filters === ''} result={result} onFilterChange={handleFilters} />
                </div>
            </Grid>
            <Grid item xs={12} sm={9}>
                <Grid container style={{ marginBottom: '10px' }} justify="flex-end">
                    <Grid item xs={12} sm={6}>
                        {query!=='' && 
                        <SearchResultDetails query={query} result={result}/>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ cursor: 'pointer' }}>
                        <SortingPanel reset={filters === ''} onChange={handleSorting} />
                        <ViewListIcon fontSize="large" />
                        <ViewModuleIcon fontSize="large" color="secondary" />
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{ width: '100%' }}>
                    {result.content && result.content.map((item) =>
                        <ProductCard key={item.id} product={item} />
                    )}
                </Grid>
                <Grid container spacing={3} style={{ width: '100%', margin: '5px 0 20px 0' }} justify="center">
                    {result.totalPages>1 && 
                    <SearchPagination pageNo={result.number+1} totalPages={result.totalPages} onChange={onPageChange}/>
                    }
                </Grid>
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Grid>
        </Grid>
    )
}
