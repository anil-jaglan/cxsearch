
import React, { useEffect, useState } from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    counter: {
        marginTop: '12px',
        backgroundColor: 'rgba(65, 66, 71, 0.08)',
        color: 'rgba(33, 36, 61, 0.8)',
        borderRadius: '4px',
        padding: '2px 5px',
        fontWeight: '600',
        fontSize: '0.75rem',
        height: '1.5rem',
        verticalAlign: 'middle'
    },
}));

export default function FacetCheckbox({ field, checked }) {
    const classes = useStyles();

    const [check, setCheck] = useState(false);

    useEffect(() => {
        setCheck(checked)
    }, [checked])

    const handleChange = (e) => {
        setCheck(!check)
    }

    return (
        <>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <FormControlLabel
            key={field.value}
            control={<Checkbox onChange={handleChange} name={field.value} checked={check} onChange={handleChange} />}
            label={field.value}
            color="primary"
            style={{ textTransform: "capitalize" }}
        />
        <span className={classes.counter}>{field.valueCount}</span>        
        </div>
        </>
    );

}