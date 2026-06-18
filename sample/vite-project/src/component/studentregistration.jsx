import React, { useState } from 'react'

function Studentregistration() {
    const{data,setData}=useState({name:"",tel:"",email:""});
    const handleChange=(e)=>{
        setData({...data,[e.target.value]:[e.target.name]});

    };
    const handelSubmit=(e)=>{
      e.preventDefault();
      if(data.name=="" || data.tel=="" ||data.email==""){
        alert("fill all data!");
      
      }
      else{
        alert(`data submitted successfully by ${data.name}!`)
      }
      setData({name:"",tel:"",email:""});
    };
    
  return (
    <div>
    <h1>studentregistration</h1>
    <form>
        <label htmlfor="name">Name:</label>
        <input type="text" id="name" name="name" required/>
        
        <label htmlfor="name">Mobile</label>
        <input type="tel" id="name" name="tel" required value={data.tel}/>
        
        <label html for="name">Email:</label>
        <input type="email" id="name" name="email" required value={data.email}/>
        <button type='submit'>Registration Here!</button>


    </form>
    </div>
  )
}

export default Studentregistration