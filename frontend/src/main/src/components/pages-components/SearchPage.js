import React, { useEffect, useState } from 'react'
import {SEARCH_PAGE_SIZE as size, DEFAULT_SORTING} from '../../utilities/constants'

import axios from 'axios'

import { useSnackbar } from 'notistack';
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
import FacetTags from '../featured-components/FacetTags';
import MediaQuery from 'react-responsive';


const useStyles = makeStyles((theme) => ({
    resultArea: {
        borderLeft: 'solid 1px #E0E0E0',
        paddingLeft: '15px',
    },
    resultDetails: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    tagClouds: {
        borderBottom: 'solid 1px #E0E0E0',
        padding: '0 0 5px 20px'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    icon: {
        cursor: 'pointer',
    },
}));

export default function SearchPage({ query }) {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();
    const source = axios.CancelToken.source()
    const [result, setResult] = useState({content: [], number: 0, totalPages: 0})
    const [formatedQuery, setformatedQuery] = useState('')
    const [fq, setFq] = useState('')
    const [filters, setFilters] = useState({}) // {price: [0,100], category: ['hp color cartridge','hp black toner'], brand: ['epson', 'apple']}
    const [sort, setSort] = useState(DEFAULT_SORTING)
    const [loading, setLoading] = useState(false)
    const [queryChanged, setQueryChanged] = useState(false)
    const [page, setPage] = useState(0)
    const [viewType, setViewType] = useState('box')
    const variant = 'error'

    useEffect(() => {
        const formatedQuery = query.toLowerCase().split().join('+')
        setformatedQuery(formatedQuery)
        setFq('')
        setFilters({})
        setPage(0)
        setQueryChanged(true)
    }, [query])

    useEffect(() => {
        setLoading(true)
        const request = getRequest(`/v2/search?q=${formatedQuery}&page=${page}&size=${size}${fq}&sort.field=${sort[0]}&sort.order=${sort[1]}`, source)
        request()
            .then((data) => {
                setLoading(false)
                if(data && data.data) {
                    setResult(data.data)
                } else {
                    enqueueSnackbar('Error while fetching data', { variant })
                }
                setQueryChanged(false)
            })
            .catch((error) => enqueueSnackbar(error, { variant }))

        return () => source.cancel()
    }, [formatedQuery, fq, sort, page])

    const handleFilters = (data) => {
        setFilters(data)
        const fltr = Object.keys(data).map((key) => {
            if (key === 'price') {
                return `&facet.${key}.from=${data[key][0]}&facet.${key}.to=${data[key][1]}`
            } else {
                return data[key].map(val => `&facet.${key}=${val}`).join('')
            }
        }).join('')
        setFq(fltr)
        setSort(DEFAULT_SORTING)
    }

    const handleSorting = (order) => {
        setPage(0)
        setSort(order.split(','))
    }

    const onPageChange = (page) => {
        setPage(page-1)
    }
    const handleTagDelete = (tag) => {
        const f = filters
        Object.keys(f).map((key) => {
            if(tag.type === key) {
                if(key === 'price') {
                    delete f.price
                } else {
                    f[key] = f[key].filter(label => label !== tag.key)
                }
            }
        })
        handleFilters(f)
    }

    return (
        <Grid container spacing={0} style={{ marginTop: '20px', }}>
            <Grid item xs={12} className={classes.tagClouds}>
                <FacetTags data={filters} onTagDelete={handleTagDelete}/>
            </Grid>
            <MediaQuery minDeviceWidth={1224}>
                <Grid item xs={12} sm={4} md={4} lg={3}>
                    <div style={{ 'padding': '0px 10px' }}>
                        <Facetbar reset={fq === ''} result={result} onFilterChange={handleFilters} />
                    </div>
                </Grid>
            </MediaQuery>
            <Grid item xs={12} sm={8} md={8} lg={9} className={classes.resultArea}>
                <Grid container style={{ marginBottom: '10px' }} justify="flex-end">
                    <Grid item xs={12} sm={12} lg={6} className={classes.resultDetails}>
                        <SearchResultDetails query={query} result={result}/>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                        <SortingPanel reset={queryChanged} onChange={handleSorting} />
                        <ViewModuleIcon className={classes.icon} fontSize="large" color={viewType==='box'? 'secondary' : ''} onClick={() => setViewType('box')} />
                        <ViewListIcon  className={classes.icon} fontSize="large" color={viewType==='list'? 'secondary' : ''} onClick={() => setViewType('list')} />
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{ width: '100%' }}>
                    {result.content && result.content.map((item) =>
                        <ProductCard key={item.id} product={item} viewType={viewType} />
                    )}
                </Grid>
                <Grid container spacing={3} style={{ width: '100%', margin: '5px 0 20px 0' }} justify="center">
                    {result.totalPages>1 && 
                    <SearchPagination pageNo={result.number+1} totalPages={result.totalPages} onChange={onPageChange}/>
                    }
                </Grid>
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Grid>
        </Grid>
    )
}
