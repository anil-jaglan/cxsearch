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

export default function FacetTags({data, onTagDelete}) {

    const classes = useStyles()
    const [chips, setChips] = React.useState([])

    React.useEffect(()=>{
        if(data) {
            const tags = []
            Object.keys(data).map((key) => {
                if (key === 'price') {
                    tags.push({type: key, key: key, label:`Price: [${CURRENCY_SIGN}${data[key][0]}-${CURRENCY_SIGN}${data[key][1]}]`})
                } else if(key == 'category') {
                    return data[key].map(val=>  tags.push({type: key, key: val, label: val}))
                } else {
                    return data[key].map(val=>  tags.push({type: key, key: val, label: val}))
                }
            })
            setChips(tags)
        }
    },[data])

    const handleDelete = (data) => {
        setChips((chips)=> chips.filter(c=> c.key != data.key))
        onTagDelete(data)
    }

    return (
        <div className={classes.root}>
            {chips.map((t) => 
                <Chip
                key={t.key}
                label={t.label}
                onClick={()=>handleDelete(t)}
                color="secondary"
                onDelete={()=>handleDelete(t)}/>
            )
        }
        </div>
    )
}