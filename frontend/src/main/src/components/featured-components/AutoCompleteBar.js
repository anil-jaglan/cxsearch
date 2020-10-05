import React, { useEffect, useState } from 'react'
import Icon from '../icons'
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'

import Grid from '@material-ui/core/Grid'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

import axios from 'axios'

import getRequest from '../../utilities/getRequest'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}))

export default function AutoCompoleteBar({ setQuery, resetQuery }) {
    const classes = useStyles()

    const [term, setTerm] = useState('')
    const [value, setValue] = useState(null)
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const loading = open && options.length === 0

    const source = axios.CancelToken.source()

    useEffect(() => {
        return () => resetQuery()
    }, [])

    useEffect(() => {
        let active = true

        // if (!loading) {
        //     return undefined
        // }
        if (term === '') {
            setOptions(term ? [term] : [])
            return undefined
        }

        const request = getRequest(`/autocomplete?term=${term}&page=0&size=50`, source)
        request()
            .then((data) => {
                if (active) {
                    let newOptions = [];
                    if (value) {
                        newOptions = [value];
                    }

                    if (data.data) {
                        newOptions = [...newOptions, ...data.data];
                    }
                    setOptions(newOptions);
                }
            })
            .catch((error) => console.log(error))

        return () => source.cancel()

    }, [term, value, loading])

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open])

    const onSearchClick = (value) => {
        setQuery(value)
    }
    const handleSelect = (value) => {
        let q = value !== null ? value : '';
        setTerm(q)
        if (q !== '')
            setQuery(q);
    }

    return (
        <>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <div className="SearchContainer">
                        <div className='SearchBar'>
                            <Autocomplete
                                id="search-box"
                                open={open}
                                onOpen={() => {
                                    setOpen(true)
                                }}
                                onClose={() => {
                                    setOpen(false)
                                }}
                                freeSolo
                                disableClearable
                                getOptionSelected={(option, value) => option === value}
                                getOptionLabel={(option) => option}
                                options={options}
                                loading={loading}
                                value={term}
                                onChange={(event, value) => {
                                    setValue(value)
                                }}
                                onInputChange={(event, newInputValue) => {
                                    setTerm(newInputValue)
                                }}
                                renderInput={(params) => (                                    
                                    <TextField
                                        {...params}
                                        placeholder="Search"
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <Button variant="contained" color="secondary" onClick={() => onSearchClick(term)} style={{ marginLeft: '10px' }}>Search</Button>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}