import React from 'react'
import SearchRow from '../featured-components/SearchRow'

export default function QueryPage({query}) {
    return (
        <div className="page-content">
            <div className='pageContent'>
                <SearchRow title='Products' type='product' query={query}/>
            </div>
        </div>
        
    )
}
