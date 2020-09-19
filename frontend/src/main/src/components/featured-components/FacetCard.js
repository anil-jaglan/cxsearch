import React, { useEffect, useState } from 'react'

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));


export default function FacetCard({ content }) {
    const classes = useStyles();
    const [result, setResult] = useState([])

    useEffect(() => {
        setResult(content)
    }, [content])

    const handleChange = (e) => {

    }

    return (
        <Grid item>
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Category</FormLabel>
                    <FormGroup>
                        {
                            content
                                ?
                                content.map(c =>
                                    <FormControlLabel
                                        control={<Checkbox  onChange={handleChange} name={c.value} />}
                                        label={c.value}
                                        color="primary"
                                        style={{textTransform: "capitalize"}}
                                    />)
                                : null
                        }

                    </FormGroup>
                </FormControl>
            </div>
        </Grid>
    )
}