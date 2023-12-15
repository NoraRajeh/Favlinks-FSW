
function TableHeader(){
  /* responsible for rendering the head of our table with the appropriate columns */
  return(
      <thead>
      <tr style={{ borderBottom:"solid 1px #ccc" }}>
        <th>Name</th>
        <th>URL</th>
        <th>Remove</th>
        <th>Edit</th>
      </tr>
    </thead>
  )
}

const TableBody = (props) => {
  // boilerplate table body functional component
  // we use Array.map to create table rows from LinkData passed via props
  const rows = props.linkData.map((row, index) => {
    return (
      <tr key={index} style={{ borderBottom:"solid 1px #ccc"}}>
        <td style={{padding:".8rem"}}>{row.name}</td>
        <td>
          <a href={row.URL}>{row.URL}</a>
        </td>
        <td>
          <button onClick={() => props.removeLink(index)} style={{width:"5rem", height:"1.8rem", backgroundColor:"#1447FD", color:"white", borderRadius:".3rem", border:"none"}}>Delete</button>
        </td>
        <td>
          <button onClick={() => props.editLink(index)} style={{width:"5rem", height:"1.8rem", backgroundColor:"#1447FD", color:"white", borderRadius:".3rem", border:"none"}}>Edit</button>
        </td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}


function Table(props){
  return(
      <table style={{width:"100%", textAlign: "left", borderCollapse: "collapse"}}>
      <TableHeader/>
      <TableBody linkData={props.linkData} removeLink={props.removeLink} editLink={props.editLink}/>
      </table>
  )
}

export default Table