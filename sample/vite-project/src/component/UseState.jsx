import React, { useState } from 'react'

function UseState() {
    const[color,setColor]=useState('blue');

    const mouseover=()=>{
        // setColor('red');
        setColor(color=='blue'?'red':'blue')
    }
    //couter 
    const[count,setCount]=useState(0);

    const increment=()=>{
        setCount(count+1);
    }
    const decrement=()=>{
        setCount(count-1)
    }
    const reset=()=>{
        setCount(0);
       }

  return (
    <>
    <h1>UseState</h1>
    <p style={{color:color}} onMouseOver={mouseover}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita maiores placeat, eveniet eum quis fugit ad unde officia at nisi, reprehenderit necessitatibus, in deserunt. Repellendus aut dolorem animi minus assumenda.</p>

    <div>
        <h2>{count}</h2>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>reset</button>
    </div>

    </>
    
  )
}

export default UseState