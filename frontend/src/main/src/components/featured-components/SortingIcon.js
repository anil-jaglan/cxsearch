
import React, { useEffect, useState } from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import SortIcon from '@material-ui/icons/Sort';

export default function SortingIcon({onChange}) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = (sortOrder) => {
        setAnchorEl(null)
        onChange(sortOrder)
    };

    return (
        <>
            <SortIcon fontSize="large" color="secondary" aria-controls="sorting-menu" aria-haspopup="true" onClick={handleClick}/>
            <Menu
                id="sorting-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={(e)=>handleClose('')}>Relevance</MenuItem>
                <MenuItem onClick={(e)=>handleClose('asc')}>Price - Low to High</MenuItem>
                <MenuItem onClick={(e)=>handleClose('desc')}>Price - Hight to Low</MenuItem>
                
            </Menu>
        </>
    )
}