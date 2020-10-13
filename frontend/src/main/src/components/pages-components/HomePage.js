import React, { useState, useEffect, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Headerbar from '../featured-components/Headerbar'
import PageContent from '../featured-components/PageContent'
import SearchBar from '../featured-components/SearchBar'

import { MessageContext } from '../../utilities/context'
import AutoCompleteBar from '../featured-components/AutoCompleteBar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // background: '#121212',
        overflowY: 'scroll',
        position: 'relative',
        marginLeft: '5px',
    }
}));

export default function HomePage(props) {
    const classes = useStyles();

    const setMessage = useContext(MessageContext)
    const [query, setQuery] = useState('');

    const resetQuery = () => {
        setQuery('')
    }

    // useEffect(() => {

    // }, [])

    return (
        <>
            <div className={classes.root}>
                <Grid container direction="row" justify="center" style={{ marginTop: '12px', width: 'calc(100% + 0px)', padding: '0 6px' }}>
                    <Grid item xs={12}>
                        <Headerbar>
                            <AutoCompleteBar setQuery={setQuery} resetQuery={resetQuery} />
                        </Headerbar>
                    </Grid>
                    <Grid item xs={12}>
                        <PageContent query={query} {...props} />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}


