import React, { useEffect, useState } from 'react'

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CustomizedSlider from '../core-components/Slider';

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
        textTransform: "capitalize",
        fontWeight: 'bold',
    },
}));


export default function SliderFacetAccordion({ title, facetStats, expanded, handleFilterChange }) {
    const classes = useStyles()
    const [expand, setExpand] = useState(true)
    const [stats, setStats] = useState({})

    useEffect(() => {
        setExpand(expanded)
        setStats(facetStats)
    }, [expanded, facetStats])

    const handleChange = (e) => {
        setExpand(!expand);
    }
    
    const onSliderChange = (data) => {
        handleFilterChange({title: title, values: data})
    }

    return (
        <Grid item>
            <div className={classes.root}>
                <Accordion expanded={expand} onChange={handleChange}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography className={classes.heading}>{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>                        
                        <CustomizedSlider stats={stats && stats.Current_Price} onSliderChange={onSliderChange} />                            
                    </AccordionDetails>
                </Accordion>
            </div>
        </Grid>
    )
}