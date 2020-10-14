import React, { useEffect, useState } from 'react'
import { FACET_TO_SHOW, SHOW_MORE_LABEL, SHOW_LESS_LABEL } from '../../utilities/constants'

import { AccordionActions, Button, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FacetCheckbox from '../core-components/FacetCheckbox'
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
        fontWeight: theme.typography.fontWeightBold,
        textTransform: "capitalize",
    },
    details: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0 12px 0 0',
    },
    checkboxList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'auto',
        maxHeight: '380px',
        width: '100%',
        padding: '0 12px 0 0',
    },
}));


export default function CheckboxFacetAccordion({ reset, title, content, expanded, handleFilterChange }) {
    const classes = useStyles();
    const [result, setResult] = useState([])
    const [selected, setSelected] = useState([])
    const [expand, setExpand] = useState(true)
    const [showMore, setShowMore] = useState(true)
    const [rowCount, setRowCount] = useState(FACET_TO_SHOW)

    useEffect(() => {
        setExpand(expanded)
        setShowMore(content.length > FACET_TO_SHOW ? true : false)
        setRowCount(FACET_TO_SHOW)
        const labels = content.map(c => c.value)
        const sel = selected.filter(s => labels.includes(s))
        setSelected(sel)
        setResult(sortResultBySelectedFacet(content, sel))
    }, [content, expanded])

    const sortResultBySelectedFacet = (facets, sel) => {
        const _checked = []
        const _unchecked = []
        facets.forEach(f=>{
            if(sel.includes(f.value)) {
                _checked.push(f)
            } else {
                _unchecked.push(f)
            }
        })
        return [..._checked, ..._unchecked]
    }


    useEffect(() => {
        if (reset)
            setSelected([])
    }, [reset])

    useEffect(() => {
        if (showMore)
            setRowCount(FACET_TO_SHOW)
        else
            setRowCount(result.length)
    }, [showMore])

    const toggleAccordion = (e) => {
        setExpand(!expand);
    }
    const handleCheck = (data) => {
        let selection = []
        if (data.checked) {
            selected.push(data.label)
            selection = selected
        } else {
            selected.filter(e => e != data.label).forEach(e => selection.push(e))
        }
        setSelected(selection)
        handleFilterChange({ title: title, values: selection })
    }

    const handleSearchInput = (event) => {
        console.log(event.target.value)
    }


    return (
        <Grid item>
            <div className={classes.root}>
                <CustomAccordion expanded={expand} onChange={toggleAccordion}>
                    <AccordionSummary style={{ padding: '0px' }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                        <TextField fullWidth id={title} size="small" placeholder="Search..." variant="outlined" onChange={handleSearchInput} />
                        <div className={classes.checkboxList}>
                            <FormGroup style={{ width: '100%' }}>
                                {
                                    result
                                        ?
                                        result.slice(0, rowCount).map(c =>
                                                <FacetCheckbox key={c.value} field={c} checked={selected.indexOf(c.value) > -1} onChange={handleCheck} />

                                        )
                                        : null
                                }
                            </FormGroup>
                        </div>
                    </AccordionDetails>
                    <AccordionActions>
                        {showMore && <Button color="secondary" onClick={() => setShowMore(false)}>{SHOW_MORE_LABEL}</Button>}
                        {(!showMore && result.length > FACET_TO_SHOW) && <Button color="secondary" onClick={() => setShowMore(true)}>{SHOW_LESS_LABEL}</Button>}
                    </AccordionActions>
                </CustomAccordion>
            </div>
        </Grid>
    )
}