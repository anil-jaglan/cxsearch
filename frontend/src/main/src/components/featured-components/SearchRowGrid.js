import React from 'react'

import Grid from '@material-ui/core/Grid';

import BrowseCard from './BrowseCard'


export default function RowGrid({ info }) {
    return (
        <Grid item spacing={3}>
            {info.map((item) => {
                // return <ProductCard key={item.id} info={item}/> 
                return (
                    <Grid item xs={12} sm={3}>
                        <BrowseCard key={item.id} info={item} />
                    </Grid>
                )
            })}
        </Grid>
    )
}
