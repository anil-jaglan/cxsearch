import React, {useState, useEffect} from 'react'
import axios from 'axios'

import getRequest from '../../utilities/getRequest'

import BrowseCard from '../featured-components/BrowseCard'
import PageTitle from '../featured-components/PageTitle'

export default function BrowsePage() {
    const [products, setProducts] = useState([])
    const source = axios.CancelToken.source()

    useEffect(() => {
        const request = getRequest('/search?page=0&size=100', source)

        request()
            .then((data) => {
                setProducts(data.data.content)
            })
            .catch((error) => console.log(error))
        
        return () => source.cancel()
    }, [])

    return (
        <div className="page-content">
            <div className='browsePage'>
                <PageTitle name='Browse All' />
                <div className="browseGrid">
                    {products.map((product) => {
                        return <BrowseCard key={product.id} info={product}/>
                    })}
                </div>
            </div>
        </div>
    )
}
