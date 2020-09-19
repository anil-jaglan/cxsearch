import React from 'react'
import {useEffect, useState, useContext} from 'react'
import axios from 'axios'

import getRequest from '../../utilities/getRequest'

import PageTitle from '../featured-components/PageTitle'
import ProductCard from '../featured-components/ProductCard'

import useId from '../../utilities/hooks/useId'
import {MessageContext} from '../../utilities/context'


export default function ProductPage() {
    const id = useId()
    const setMessage = useContext(MessageContext)
    const source = axios.CancelToken.source()

    const [product, setProduct] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        const request = getRequest(`/products/${id}`, source)        
        request()
        .then((data) => {
            console.log(data);
            setName(data.data.name)
            setProduct(data.data)
        })
        .catch((error) => console.log(error))
        
        return () => source.cancel()
    // eslint-disable-next-line
    }, [id])

    return (
        <div className='GenrePage page-content'>
            <PageTitle name={name}/>
            <div className="browseGrid">                
                <ProductCard key={product.id} info={product}/>
            </div>
        </div>
    )
}
