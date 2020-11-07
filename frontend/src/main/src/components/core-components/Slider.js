import React, { useEffect } from 'react';
import {CURRENCY_SIGN as currency, PRICE_SLIDER_MIN_VALUE as MIN, PRICE_SLIDER_MAX_VALUE as MAX } from '../../utilities/constants'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { Grid, Button, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
    },
    margin: {
        height: theme.spacing(3),
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
        },
        display: 'flex',
    },
    button: {
        marginTop: '23px',
        padding: '2px',
        minWidth: '35px'
    },
}));

const CxSlider = withStyles({
    root: {
        color: '#f50057',
        height: 3,
        padding: '13px 0',
        width: '90%',
    },
    thumb: {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        marginTop: -12,
        marginLeft: -13,
        boxShadow: '#ebebeb 0 2px 2px',
        '&:focus, &:hover, &$active': {
            boxShadow: '#ccc 0 2px 3px 1px',
        },
        '& .bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    track: {
        height: 3,
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: 3,
    },
})(Slider);

function CxThumbComponent(props) {
    return (
        <span {...props}>
            {/* <span className="bar" />
            <span className="bar" />
            <span className="bar" /> */}
        </span>
    );
}

export default function CustomizedSlider({ stats, reset, onSliderChange }) {
    const classes = useStyles()
    const [min, setMin] = React.useState(MIN)
    const [max, setMax] = React.useState(MAX)
    const [limit, setlimit] = React.useState([MIN, MAX])
    const [value, setValue] = React.useState([MIN, MAX])

    useEffect(() => {
        if(stats) {
            let mn = Math.round(stats.min)
            let mx = Math.round(stats.max)
            mn = isNaN(mn) ? MIN : mn
            mx = isNaN(mx) ? MAX : mx
            if(reset) {
                setMax(mx)
                setlimit([mn, mx])
                setValue([mn, mx])
                setMin(mn)
            }
        }
    }, [stats, reset])

    const handleChange = (event, newValue) => {
        updateValue(newValue)
    };

    const updateValue = (value) => {
        setValue(value)
        setMin(value[0])
        setMax(value[1])
    }

    const handleInputChange = (type, event) => {
        const v = event.target.value === '' ? '' : Number(event.target.value);
        if (type === 'min') {
            updateValue([v, value[1]])
        } else {
            updateValue([value[0], v])
        }
    }

    const handleChangeCommited = (event,value) => {
        updateValue(value)
        onSliderChange(value)
    }

    const handleButtonClick = (e) => {
        onSliderChange(value)
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{padding: '0 3px 0 30px'}}>
                    <CxSlider
                        ThumbComponent={CxThumbComponent}
                        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                        value={value}
                        max={limit[1]}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(x)=> currency+x}
                        onChange={handleChange}
                        onChangeCommitted={handleChangeCommited}
                    />
                </Grid>
                <Grid item xs={12} style={{padding: '0 0 0 13px'}}>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            label="Min"
                            className={classes.input}
                            value={min}
                            margin="dense"
                            onChange={(event) => handleInputChange('min', event)}
                            InputProps={{
                                min: min,
                                max: max,
                                type: 'number',
                                'aria-labelledby': "min-input",
                            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                            }}
                        />
                        <TextField
                            label="Max"
                            className={classes.input}
                            value={max}
                            margin="dense"
                            onChange={(event) => handleInputChange('max', event)}
                            InputProps={{
                                min: min,
                                max: max,
                                type: 'number',
                                'aria-labelledby': "max-input",
                            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                            }}
                        />
                        <Button className={classes.button} size="small" variant="contained" color="secondary" onClick={handleButtonClick}>GO</Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}
