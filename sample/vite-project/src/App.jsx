import './App.css'
import Demo from './component/Demo'
import Exp7 from './component/Exp7';
import Props from './component/Props'
import Studentregistration from './component/studentregistration';
import UseState from './component/UseState';


function App() {
 const name="ABES College";

 const students=[
  {name:"Vinay", rollno:"25B010232", course:"B.tech"},
  {name:"Vinay2", rollno:"25B010232", course:"B.tech"},
  {name:"Vinay3", rollno:"25B010232", course:"B.tech"}
 ];

  return (
    <>
      <h1>Welcome to React</h1>
      <h2>Hello {name}</h2>
      { <Demo/> }
      {<Props name="Vikas" rollno="25B012243" course="B.Tech"/> }
      {/* <Exp7 students={students}/> */}
      <UseState/>
      <Studentregistratione/>
    </>
  )
}

export default App
