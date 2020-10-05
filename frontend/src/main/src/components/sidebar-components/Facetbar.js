import React from 'react'

import Grid from '@material-ui/core/Grid';

import FacetAccordion from '../featured-components/FacetAccordion';

export default function Facetbar({facetResult}) {
    const [facetTitle] = React.useState(['Price', 'Category', 'Brand'])

    return (
        <div style={{ 'padding': '0px 10px' }}>
                {facetResult.length > 0 ? facetResult[0].map((page, i) => <FacetAccordion key={i} expanded={true} title={facetTitle[i]} content={page.content} />) : null}
        </div>
    )
}