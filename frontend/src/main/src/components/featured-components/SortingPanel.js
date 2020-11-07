import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

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

    React.useState(() => {
        console.log('Reset=>', reset)
        if (reset)
            setAc(allFalse)
    }, [reset])

    const handleClose = (i, sortOrder) => {
        setAc(allFalse)
        const t = allFalse
        t[i] = true
        setAc(t)
        onChange(sortOrder)
    };

    return (
        <>
            <span className={classes.label}>Sort By:</span>
            <Link className={classes.link + ' ' + (ac[0] ? classes.linkActive : '')} onClick={(e) => handleClose(0, 'score,desc')}>Popularity</Link>
            <Link className={`${classes.link}  ${(ac[1] ? classes.linkActive : '')}`} onClick={(e) => handleClose(1, 'Current_Price,asc')}>Price - Low to High</Link>
            <Link className={`${classes.link}  ${(ac[2] ? classes.linkActive : '')}`} onClick={(e) => handleClose(2, 'Current_Price,desc')}>Price - Hight to Low</Link>
        </>
    )
}