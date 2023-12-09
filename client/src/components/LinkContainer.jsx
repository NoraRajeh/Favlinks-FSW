import Table from './Table'
import Form from './Form'
import { useState } from 'react'

function LinkContainer(){
    const [favLinks, setFavLinks] = useState([])

    const handleRemove = (index) => {
        setFavLinks([...(favLinks.filter((_, idx)=> idx != index))])
    }
    
    const handleSubmit = (favLink) => {
        setFavLinks([...favLinks, favLink])
    }

    return(
        <div style={{padding: "1rem 6rem", }}>
            <h1>My Favorite Links</h1>
            <p>Add a new link with a name and URL to the table! </p>
            <Table linkData={favLinks} removeLink={handleRemove}/>
            <h1>Add New</h1>
            <Form handleSubmit={handleSubmit}/>
            {/* <div style={{height:"5rem", width:"100%"}}></div> */}
            {/* <div style={{backgroundColor:"black", textAlign:"center" }}>hello</div> */}
        </div>
    )

}
export default LinkContainer