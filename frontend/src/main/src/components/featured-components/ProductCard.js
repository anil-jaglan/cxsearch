import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CURRENCY_SIGN, IMG_WIDTH as iw, IMG_HEIGHT as ih } from '../../utilities/constants'

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

export default function ProductCard({ product, viewType }) {
    const classes = useStyles();
    const [hovered, setHovered] = React.useState(false);
    const toggleHover = () => setHovered(!hovered);
    const { name, id, image } = product
    return (
        <>
            {viewType === 'box' ?
                <Grid item xs={12} sm={6} lg={3}>
                    <div className="product" id={id}>
                        <div className={`make3D ${hovered ? 'animate' : ''}`} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                            <div className="product-front">
                                <div className="shadow"></div>
                                <img className="quick-view" src={`${image}/tr:w-${iw},h-${ih},cm-pad_resize`} alt="" />
                                <div className="stats">
                                    <div className="stats-container">
                                        <span className="product_name quick-view">{name}-{product.supplierSku}</span>
                                        <p>{product.desc}</p>
                                        <span className="product_price">{CURRENCY_SIGN}{product.price}</span>
                                    </div>
                                    <div className="buttons">
                                        <div className="quick-view-popup view_gallery quick-view">View</div>
                                        <button className="add-to-cart">
                                            <em>Add to Cart</em>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                :
                <div className="product large" >
                    <div className={`info-large details ${hovered ? 'animate' : ''}`} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                        <h2 className="quick-view">{name}-{product.supplierSku}</h2>
                        <div className="desc">{product.desc}</div>
                        <div className="price-big">{CURRENCY_SIGN}{product.price}</div>
                        <div className="buttons">
                            <div className="quick-view-popup quick-view">View</div>
                            <button className="add-to-cart">
                                <em>Add to Cart</em>
                            </button>
                        </div>
                    </div>
                    <div className="make3D">
                        <div className="product-front">
                            <div className="shadow">
                            </div>
                            <img className="quick-view" src={`${image}/tr:w-${iw},h-${ih},cm-pad_resize`} alt="" />
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

