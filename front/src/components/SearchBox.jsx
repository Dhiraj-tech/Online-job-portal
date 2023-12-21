import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { isEmpty } from "../lib"

export const SearchBox = () => {
    const [term, setTerm] = useState('')

    const navigate = useNavigate()
    
    useEffect(() => {
        if(!isEmpty(term)){
            navigate(`/search?term=${term}`)
        }

    }, [term])

    return <>
        <div className="container" id="searchcontain">
        <input placeholder='Search...' className='js-search' id="searchinput" type="text" 
        value={term} onChange={ev => setTerm(ev.target.value)} required />
        <i className="fa fa-search" id="searchicon"></i>
    </div>
  </>
}


