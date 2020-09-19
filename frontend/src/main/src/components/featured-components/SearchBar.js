import React, { useEffect, useState } from 'react'
import Icon from '../icons'

import Grid from '@material-ui/core/Grid';

import SearchAutoComplete from './SearchAutoComplete'

export default function SearchBar({ query, setQuery, resetQuery }) {
    const [term, setTerm] = useState('')
    const [focused, setFocused] = useState(false);
    const [hint, setHint] = useState(false);
    useEffect(() => {
        return () => resetQuery()
    }, [])
    const handleChange = (value) => {
        setHint(true)
        setTerm(value)
    }
    const handleSelect = (value) => {
        setHint(false)
        setTerm(value)
        setQuery(value)
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={6}>
                <div className="SearchContainer">
                    <div className='SearchBar'>
                        <div style={iconStyle}>
                            <Icon name="N-Search" />
                        </div>
                        <input className='SearchInput no-outline'
                            maxLength='80'
                            autoCorrect='off'
                            autoCapitalize='off'
                            spellCheck='false'
                            autoFocus={true}
                            placeholder='Search for Products'
                            value={term}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            onChange={e => handleChange(e.target.value)} />
                        {(hint || focused) ? <SearchAutoComplete term={term} onSelect={handleSelect} /> : null}
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}


const iconStyle = {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '12px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'text'
}

