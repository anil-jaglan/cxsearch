import React from 'react'
import {CURRENCY_SIGN} from '../../utilities/constants'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}))

export default function FacetTags({data}) {

    const classes = useStyles()
    const [chips, setChips] = React.useState([])

    React.useEffect(()=>{
        console.log(data)
        const tags = Object.keys(data).map((key, i) => {
            if (key === 'price') {
                return `Price: [${CURRENCY_SIGN}${data[key][0]}-${CURRENCY_SIGN}${data[key][1]}]`
            } else if(key == 'category') {
                return "Categories: "
            } else {
                return `Brand: `
            }
        })
        setChips(tags)
    },[data])

    const handleDelete = () => {
        console.info('You clicked the delete icon.')
    }

    const handleClick = () => {
        console.info('You clicked the Chip.')
    }
    return (
        <div className={classes.root}>
            {chips.map((t) => 
                <Chip
                key={t}
                label={t}
                onClick={handleClick}
                color="secondary"
                onDelete={handleDelete}/>
            )
        }
        </div>
    )
}