import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}))

export default function SearchPagination({pageNo, totalPages, onChange}) {
    const classes = useStyles()
    const handleChange = (event, page) => {
        onChange(page)
    }
    return (
        <div className={classes.root}>            
            <Pagination onChange={handleChange} page={pageNo} count={totalPages} color="secondary" size="large" siblingCount={3} />
        </div>
    )
}