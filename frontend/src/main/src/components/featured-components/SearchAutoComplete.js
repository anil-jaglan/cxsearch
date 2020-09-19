import React, { useEffect, useState } from 'react'
import axios from 'axios'

import getRequest from '../../utilities/getRequest'

export default function SearchAutoComplete({ term,  onSelect }) {

    const [result, setResult] = useState([])   
    const source = axios.CancelToken.source()

    const handleSelect = (value) => {        
        onSelect(value)
    }   
    useEffect(() => {
        if(term == '') {
            return () => source.cancel()
        }
        const request = getRequest(`/autocomplete?term=${term}`, source)
        request()
            .then((data) => {                
                setResult(data.data)                
            })
            .catch((error) => console.log(error))

        return () => source.cancel()
    }, [term])

    return (        
        <div className="SearchAutocomplete">
            <ul>
                {result.map((data) => <li className="SearchHint" key={data} onClick={e => handleSelect(data)}>{data}</li>)}
            </ul>
        </div>
    );

}