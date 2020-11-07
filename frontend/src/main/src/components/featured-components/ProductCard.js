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
                <Grid item lg={3}>
                    <div class="product" id={id}>
                        <div className={`make3D ${hovered ? 'animate' : ''}`} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                            <div class="product-front">
                                <div class="shadow"></div>
                                <img class="quick-view" src={`${image}/tr:w-${iw},h-${ih},cm-pad_resize`} alt="" />
                                <div class="stats">
                                    <div class="stats-container">
                                        <span class="product_name quick-view">{name}-{product.supplierSku}</span>
                                        <p>{product.desc}</p>
                                        <span class="product_price">{CURRENCY_SIGN}{product.price}</span>
                                    </div>
                                    <div class="buttons">
                                        <div class="quick-view-popup view_gallery quick-view">View</div>
                                        <button class="add-to-cart">
                                            <em>Add to Cart</em>
                                            <svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
                                                <path stroke-dasharray="19.79 19.79" stroke-dashoffset="19.79" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11">
                                                </path>
                                            </svg>
                                            <label>Added</label>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                :
                <div class="product large" >
                    <div className={`info-large details ${hovered ? 'animate' : ''}`} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                        <h2 class="quick-view">{name}-{product.supplierSku}</h2>
                        <div class="desc">{product.desc}</div>
                        <div class="price-big">{CURRENCY_SIGN}{product.price}</div>
                        <div class="buttons">
                            <div class="quick-view-popup quick-view">View</div>
                            <button class="add-to-cart">
                                <em>Add to Cart</em>
                                <svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
                                    <path stroke-dasharray="19.79 19.79" stroke-dashoffset="19.79" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11">
                                    </path>
                                </svg>
                                <label>Added</label>
                            </button>
                        </div>
                    </div>
                    <div class="make3D">
                        <div class="product-front">
                            <div class="shadow">
                            </div>
                            <img class="quick-view" src={`${image}/tr:w-${iw},h-${ih},cm-pad_resize`} alt="" />
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

