import Table from './Table'
import Form from './Form'
import { useState, useEffect } from 'react'




function LinkContainer(){
    useEffect(() => {
        getLinks()
    },[]);
    const [favLinks, setFavLinks] = useState([])
    const [focus, setFocus] = useState(true)
    const getLinks = async ()=>{
        try{
            const response = await fetch('/api/links')
            const data = await response.json()
            const n_data = data['rows'].map((x)=>{
                return {
                    URL: x.url,
                    name: x.name,
                    id: x.id
                }
            })
            setFavLinks(n_data)
        }catch(e){
            console.log(e)
        }
    }

    const submitUpdate = (e)=>{
        e.preventDefault()
        const p_fav = favLinks[idx]
        fetch(`/api/links/${p_fav.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: name,
            url: URL,
        }),
        headers: { 'Content-Type': 'application/json' },
        })
        .then(() => {
            p_fav.URL = URL
            p_fav.name = name
            setFavLinks([...favLinks])
            setIsViable(false)
        })
        .catch(() => {
            alert('Has Error While update try please again')
        });
    }

    function UpdateForm(){
        return <div id='update_from' 
                style={{position:'absolute', width:'100%', 
                        height:'99vh', display:'flex', top:'0',
                        left:'0', bottom:'0', justifyContent:'center', 
                        alignItems:'center'}}>
                        <div style={{backgroundColor:'#eee', width:'50%', height:'10rem', borderRadius:'.4rem', 
                            padding:'1rem'}}>
                        <form style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%'}}>
                            <div>
                                <label htmlFor="uname">Name:</label>
                                <br/>
                                {
                                    focus?<input type="text" name="uname" id="uname" autoFocus value={name} onChange={(newVal)=>{setName(newVal.target.value);setFocus(true)}} style={{width:"99%", height:"1.8rem", borderRadius:".3rem", border:"solid 1px #888"}}/>
                                    :<input type="text" name="uname" id="uname" value={name} onChange={(newVal)=>{setName(newVal.target.value);setFocus(true)}} style={{width:"99%", height:"1.8rem", borderRadius:".3rem", border:"solid 1px #888"}}/>
                                }
                                
                            </div>
                            <div>
                                <label htmlFor="uurl">URL:</label>
                                <br/>
                                {
                                    !focus?<input type="text" name="uurl" id="uurl" autoFocus value={URL} onChange={(newVal)=>{setURL(newVal.target.value);setFocus(false)}} style={{width:"99%", height:"1.8rem", borderRadius:".3rem", border:"solid 1px #888"}}/>
                                    :<input type="text" name="uurl" id="uurl" value={URL} onChange={(newVal)=>{setURL(newVal.target.value);setFocus(false)}} style={{width:"99%", height:"1.8rem", borderRadius:".3rem", border:"solid 1px #888"}}/>
                                }
                                
                            </div>
                            <div style={{display:'flex'}}>
                                <input type="submit" value="Update" onClick={submitUpdate} style={{width:"7rem", height:"2rem", backgroundColor:"#1447FD", color:"white", borderRadius:".3rem", border:"none"}}></input>
                                <div style={{width:'1rem'}}></div>
                                <input type="submit" value="Cancel" onClick={(t)=>{t.preventDefault();setIsViable(false)}}  style={{width:"7rem", height:"2rem", backgroundColor:"#1447FD", color:"white", borderRadius:".3rem", border:"none"}}></input>
                            </div>
                        </form>
                    </div>
                </div>
    }


    const [name, setName] = useState("")
    const [URL, setURL] = useState("")
    const [idx, setIdx] = useState("")
    const [isViable, setIsViable] = useState(false)
    
    const handleRemove = (index) => {
        fetch(`/api/links/${favLinks[index].id}`, {method: 'DELETE'})
        .then(() => {setFavLinks([...(favLinks.filter((_, idx)=> idx != index))])})
        .catch(() => {
            alert('Has Error While Delete try please again')
        });
        
    }

    const handleEdit = (index) =>{
        setIdx(index)
        setIsViable(true)
    }
    
    const handleSubmit = (favLink) => {
        fetch('/api/links/', {
            method: 'POST',
            body: JSON.stringify({
                name: favLink.name,
                url: favLink.URL,
            }),
            headers: { 'Content-Type': 'application/json' },
        }).then((response)=>{
            favLink.id = response.rows[0].id
            setFavLinks([...favLinks, favLink])
        }).catch(()=>{
            alert('Has Error While Create try please again')
        })
    }

    return(
        <>
            <div style={{padding: "1rem 6rem", }}>
                <h1>My Favorite Links</h1>
                <p>Add a new link with a name and URL to the table! </p>
                <Table linkData={favLinks} removeLink={handleRemove} editLink={handleEdit}/>
                <h1>Add New</h1>
                <Form handleSubmit={handleSubmit} />
            </div>
            {isViable?<UpdateForm />:<></>}
        </>
    )

}
export default LinkContainer