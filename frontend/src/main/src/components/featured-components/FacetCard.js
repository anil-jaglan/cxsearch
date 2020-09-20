import React, { useEffect, useState } from 'react'

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBlockStart: '5px',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


export default function FacetCard({ title, content }) {
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
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormGroup>
                                {
                                    content
                                        ?
                                        content.map(c =>
                                            <FormControlLabel
                                                control={<Checkbox onChange={handleChange} name={c.value} />}
                                                label={c.value}
                                                color="primary"
                                                style={{ textTransform: "capitalize" }}
                                            />)
                                        : null
                                }

                            </FormGroup>
                        </FormControl>
                    </AccordionDetails>
                </Accordion>

            </div>
        </Grid>
    )
}