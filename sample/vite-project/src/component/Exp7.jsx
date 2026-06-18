import React from 'react'

function Exp7({students}) {
    const studentlist=[];
    for (let x in students){
        studentlist.push(
            <div key={x} style={{backgroundColor: '#f5f5f5', padding: '5px 10px'}}>
            <h3>{students[x].name}</h3>
            <h3>{students[x].rollno}</h3>
            <h3>{students[x].course}</h3>
            </div>
        );
    }
  return (
   
    <div>
        {studentlist}
    </div>
  )
}

export default Exp7