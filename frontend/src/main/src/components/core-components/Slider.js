import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
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

export default function CustomizedSlider({ data, onSliderChange }) {
    const classes = useStyles()
    const [min, setMin] = React.useState(0)
    const [max, setMax] = React.useState(100)
    const [limit, setlimit] = React.useState([0, 100])
    const [value, setValue] = React.useState([0, 100])

    useEffect(() => {
        const valArr = data.map((c) => parseInt(Number(c.value)))
        const mn = Math.min.apply(null, valArr)
        const mx = Math.max.apply(null, valArr)
        setMin(mn)
        setMax(mx)
        setlimit([mn, mx])
        setValue([0, mx])
    }, [data])

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

    const handleBlur = (type) => {
        
    }

    const handleButtonClick = (e) => {
        onSliderChange(value)
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <CxSlider
                        ThumbComponent={CxThumbComponent}
                        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                        value={value}
                        max={limit[1]}
                        valueLabelDisplay="auto"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            label="Min"
                            className={classes.input}
                            value={min}
                            margin="dense"
                            onChange={(event) => handleInputChange('min', event)}
                            onBlur={() => handleBlur('min')}
                            InputProps={{
                                min: limit[0],
                                max: limit[1],
                                type: 'number',
                                'aria-labelledby': "min-input",
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                        <TextField
                            label="Max"
                            className={classes.input}
                            value={max}
                            margin="dense"
                            onChange={(event) => handleInputChange('max', event)}
                            onBlur={() => handleBlur('max')}
                            InputProps={{
                                min: limit[0],
                                max: limit[1],
                                type: 'number',
                                'aria-labelledby': "max-input",
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                        <Button className={classes.button} size="small" variant="contained" color="secondary" onClick={handleButtonClick}>GO</Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}
