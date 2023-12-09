import {useState} from 'react';

function Form(props){
    const [name, setName] = useState("")
    const [URL, setURL] = useState("")
    const submitForm = (value, fun)=>{
        value.preventDefault();
        fun({name:name, URL:URL});
        setName("");
        setURL("");
        
    }
    return(
        <form>
            <label htmlFor="linkName">Link Name:</label>
            <br/>
            <input type="text" id="linkName" name="linkName" style={{width:"100%", height:"1.8rem", borderRadius:".3rem", border:"solid 1px #888"}} value={name} onChange={(newVal)=>setName(newVal.target.value)}/>
            <br />
            <br />
            <label htmlFor="URL">Link URL:</label>
            <input type="text" id="linkURL" name="linkURL" value={URL} onChange={(newVal)=>setURL(newVal.target.value)} style={{width:"100%", height:"1.8rem", borderRadius:".3rem", border:"solid 1px #888"}}/>
            <br/>
            <br />
            <input type="submit" value="Submit" onClick={(value)=>submitForm(value, props.handleSubmit)}  style={{width:"7rem", height:"2rem", backgroundColor:"#1447FD", color:"white", borderRadius:".3rem", border:"none"}}></input>
        </form>
    )
}

export default Form
