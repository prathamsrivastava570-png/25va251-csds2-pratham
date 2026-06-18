import React from 'react'
import{Link,Navlink} from 'react-router-dom'
import'./Nav.css';

function Nav() {
  return (
    <div>
        <nav className="navbar">
            <h2 className="logo">Mysite</h2>
            <ul ClassName="nav-links">
                <li><Navlink to="/" className ={({isActive</li>
            </ul>
        </nav>
    </div>
  )
}

export default Nav