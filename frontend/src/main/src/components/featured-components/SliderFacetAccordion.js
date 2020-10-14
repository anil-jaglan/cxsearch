import React, { useEffect, useState } from 'react'

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CustomizedSlider from '../core-components/Slider';
import CustomAccordion from '../core-components/CustomAccordion';

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
    details: {
        padding: '0px',
    }
}));


export default function SliderFacetAccordion({ title, facetStats, expanded, reset, handleFilterChange }) {
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
                <CustomAccordion expanded={expand} onChange={handleChange}>
                    <AccordionSummary style={{padding: '0px'}}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography className={classes.heading}>{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>                        
                        <CustomizedSlider stats={stats && stats.Current_Price} reset={reset} onSliderChange={onSliderChange} />                            
                    </AccordionDetails>
                </CustomAccordion>
            </div>
        </Grid>
    )
}