import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { FormLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    counter: {
        marginTop: '12px',
        float: 'right',
        backgroundColor: 'rgba(65, 66, 71, 0.08)',
        color: 'rgba(33, 36, 61, 0.8)',
        borderRadius: '4px',
        padding: '2px 5px',
        fontWeight: '600',
        fontSize: theme.typography.pxToRem(11),
        height: '1.5rem',
        verticalAlign: 'middle'
    },
}));

export default function FacetCheckbox({ field, checked, onChange }) {
    const classes = useStyles();

    const [value, setValue] = React.useState(null);
    const [check, setCheck] = React.useState(false);

    useEffect(() => {
        setCheck(checked)
        setValue(field.value)
    }, [checked, field])

    const handleChange = (e, value) => {
        const v = !check
        setCheck(v)
        onChange({ label: value, checked: v })
    }

    return (
        <>
            <div style={{ display: 'row', flexDirection: 'row' }}>
                <Checkbox color="secondary" onChange={handleChange} name={value} checked={check} onChange={(e) => handleChange(e, value)} size="small" />
                <FormLabel style={{ textTransform: "capitalize", fontSize: '0.850rem' }}>{value}</FormLabel>
                <span className={classes.counter}>{field.valueCount}</span>
            </div>
        </>
    );

}