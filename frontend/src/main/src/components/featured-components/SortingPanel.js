import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import SortIcon from '@material-ui/icons/Sort';
import FilterListIcon from '@material-ui/icons/FilterList';

import { useMediaQuery } from 'react-responsive'
import { FormControlLabel, List, ListItem, Radio, RadioGroup, SwipeableDrawer } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    label: {
        fontSize: '16px',
        color: '#999',
    },
    link: {
        fontSize: '16px',
        color: '#999',
        margin: '0 5px 0 5px',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'none',
            color: '#D71440',
            borderBottom: 'solid 2px #D71440',
        }
    },
    linkActive: {
        color: '#D71440',
        borderBottom: 'solid 2px #D71440',
    }
}));

export default function SortingPanel({ reset, onChange }) {
    const classes = useStyles();
    const allFalse = [false, false, false]
    const [ac, setAc] = React.useState(allFalse)
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const [opened, setOpened] = React.useState(false)
    const [value, setValue] = React.useState(0)

    React.useState(() => {
        console.log('Reset=>', reset)

        setAc(allFalse)
    }, [reset])

    const handleClose = (i, sortOrder) => {
        setAc(allFalse)
        const t = allFalse
        t[i] = true
        setAc(t)
        onChange(sortOrder)
        setOpened(false)
        setValue(String(i))
    }

    const closePopup = () => {
        setOpened(false)
    }
    const handleChange = (event) => {
        const val = event.target.value
        setValue(val)
        switch (val) {
            case '0':
                handleClose(0, 'score,desc')
                break
            case '1':
                handleClose(1, 'Current_Price,asc')
                break
            default:
                handleClose(2, 'Current_Price,desc')
        }
    }

    return (
        <>
            {isTabletOrMobile ? <SortIcon fontSize="large" onClick={() => setOpened(true)} /> :
                <>
                    <span className={classes.label}>Sort By:</span>
                    <Link className={classes.link + ' ' + (ac[0] ? classes.linkActive : '')} onClick={(e) => handleClose(0, 'score,desc')}>Popularity</Link>
                    <Link className={`${classes.link}  ${(ac[1] ? classes.linkActive : '')}`} onClick={(e) => handleClose(1, 'Current_Price,asc')}>Price - Low to High</Link>
                    <Link className={`${classes.link}  ${(ac[2] ? classes.linkActive : '')}`} onClick={(e) => handleClose(2, 'Current_Price,desc')}>Price - Hight to Low</Link>
                </>
            }
            <SwipeableDrawer anchor={'bottom'} open={opened} onClose={closePopup} >
                <List style={{ padding: '0 5px' }}>
                    <RadioGroup aria-label="sortBy" name="sortBy" value={value} onChange={handleChange}>
                        <FormControlLabel value="0" control={<Radio />} label="Popularity" />
                        <FormControlLabel value="1" control={<Radio />} label="Price - Low to High" />
                        <FormControlLabel value="2" control={<Radio />} label="Price - High to Low" />
                    </RadioGroup>
                </List>
            </SwipeableDrawer>
        </>
    )
}