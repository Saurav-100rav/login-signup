import React,{useState} from 'react'
import "./login.css"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
const Login = (props) => {
  const obj = {
    'email' : '',
    'password' : ''
}
  const [input,setInput] = useState(obj)
  const getInputValue = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setInput({...input,[name]:value});
}
const navigate = useNavigate();
const userLogin = async()=>{
    if(input.email===""){
      alert("Please enter your email for login..");
      return;
    }
    else if(input.password===""){
      alert("Please enter your password...");
      return;
    }
    else{
      const response = await axios.post("https://login-signup-69ih.onrender.com/login",input)
      //  console.log(response,response.data.user.name)
      console.log(response)
      if(response.data.msg==="Success"){
        alert("Congratulation, Login Succesfull.");
        const obj = await response.data.user;
        alert(obj.name)
         props.setUser(obj);
        // console.log(obj);
        navigate("/")
      }
      else if(response.data.msg==="suspected behaviour, password not matched..")
       alert(response.data.msg)
      else if(response.data.msg==="User not registered in database..."){
        alert("Email entered by you not registered in Database");
        navigate("/register")
      } 
    }

 
}
// const FormSubmitted = (e)=>{
//   e.preventDefault();
//   // let copy = input;
//   // setRecordArr([...recordarr,{...copy,id:new Date().getTime().toString()}]);
//   alert("Form submitted");
//   // console.log(input.email)
//   alert(`Your password is : ",${input.password}," \n your email is : ",${input.email}`)
//   setInput(obj);
// }
  return (
    // <form action="" onSubmit={FormSubmitted}>
    <div className='login'>
        <h1> Login </h1>

        <div className="login-box">
          <input type="email" name="email" id="email" placeholder='Enter your Email' onChange={getInputValue} value={input.email}/>
          <input type="password" name="password" id="password" placeholder='Enter your password' onChange={getInputValue} value={input.password}/>
        </div>

        <div className="login-buttons">
          <button className='btn' onClick={userLogin}>Login</button>
          <p>or</p>
          <Link to="/register"><button className='btn' id='log-reg'>Register</button> </Link>
        </div>

        
    </div>
    // </form>
  )
}

export default Login