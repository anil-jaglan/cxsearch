import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    dark: {
        backgroundColor: '#272727',
        color: '#fff',
        border: '1px solid',
        borderColor: '#fff',
    },
    media: {
        height: 200,
    },
});

export default function ProductCard({ product }) {
    const classes = useStyles();
    const { name, id, image } = product
    return (
        <Grid item lg={3}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title={name}
                    />
                    <CardContent>
                        <div className="ArticleCat">
                            {product.sectionTitle}
                        </div>
                        <div className="ArticleTitle">
                            {product.name}
                        </div>
                        <div className="ArticleDesc">
                            {product.desc}
                        </div>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <div className="ArticlePrice">${product.price}</div>
                    <Typography>{' '}</Typography>
                    <Button size="small" color="primary">Add to cart</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}


const titleStyle = {
    fontSize: '24px',
    padding: '16px',
    lineHeight: '1.3em',
    letterSpacing: '-.04em',
    overflowWrap: 'break-word',
    position: 'absolute',
    zIndex: '1',
    bottom: '0',
    textAlign: 'left',
    margin: 'auto',
    hyphens: 'auto'
}

const overlayStyle = {
    background: 'linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,.4))',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%'
}