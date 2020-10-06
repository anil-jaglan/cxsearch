import React from 'react'

import FacetAccordion from '../featured-components/FacetAccordion';

export default function Facetbar({ fresh, facetResult, onFilterChange }) {
    const [facetTitle] = React.useState(['Price', 'Category', 'Brand'])
    const [result, setResult] = React.useState([])

    React.useEffect(() => {
        if (facetResult && facetResult[1]) {
            const r = []
            facetResult[1].map((v,i) => {
                if (v.name === 'Current_Price')
                    r[0] = facetResult[0][i]
                else if (v.name === 'Section_Title')
                    r[1] = facetResult[0][i]
                else
                    r[2] = facetResult[0][i]
                return v
            })
            setResult(r)
        }
    }, [facetResult])

    const handleFilterChange = (data) => {
        const filters = {}
        if (data.title === facetTitle[0]) { // Price fiter
            filters.price = data.values
        } else if (data.title === facetTitle[1]) { // Category filter
            filters.category = data.values
        } else if (data.title === facetTitle[2]) { // Branch filter
            filters.brand = data.values
        }
        onFilterChange(filters);
    }

    return (
        <div style={{ 'padding': '0px 10px' }}>
            {result.length > 0 ? result.map((page, i) => <FacetAccordion key={i} fresh={fresh} expanded={true} title={facetTitle[i]} content={page.content} handleFilterChange={handleFilterChange} />) : null}
        </div>
    )
}