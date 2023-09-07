import React from 'react'
import {useNavigate } from 'react-router-dom';
import "./homepage.css"
const Homepage = (props) => {
  const navigate = useNavigate();
  const LogOut = ()=>{
    alert("will go")
    props.setuser();
    navigate("/");
    alert("clicked")
  }
  return (
    <div className='homepage'>
        {/* {console.log(props)} */}
        <h2>hello, {props.user.name}</h2>
        <h4>{props.user.email}</h4>
        <button id='button' onClick={LogOut}>log out</button>
    </div>
  )
}

export default Homepage