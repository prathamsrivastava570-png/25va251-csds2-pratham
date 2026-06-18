import React from 'react'

function Props(props) {
  return (
   <>
   <div style={{backgroundColor:'#CCC'}}>
     <h2>{props.name}</h2>
     <h2>{props.rollno}</h2>
     <h3>{props.course}</h3>
   </div>
   </>
  )
}

export default Props