import React,{useState} from 'react'
import axios from "axios"
import "./register.css"
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  const obj = {
    'fullname' : '',
    'email' : '',
    'password' : '',
    'password_check' : ''
}
  const [input,setInput] = useState(obj)

  const getInputValue = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setInput({...input,[name]:value});
}

// const FormSubmitted = (e)=>{
//   e.preventDefault();
//   // let copy = input;
//   // setRecordArr([...recordarr,{...copy,id:new Date().getTime().toString()}]);
//   alert("Form submitted");
//   // console.log(input.email)
//   alert(`Your name is : ",${input.fullname}," \n your email is : ",${input.email}`)
//   setInput(obj);
// }
  const navigate = useNavigate();
  const RegisterUser = ()=>{
     const { fullname,email,password,password_check} = input;
     if(fullname==="" || email==="" || password==="" || password_check==="")
          alert("Please Enter All Fields...");
     else if(fullname && email && password && password_check){
        if(password===password_check){
          axios.post("http://localhost:3050/register",input)
          .then(
            res => console.log(res),
            alert("congrats,User added Successfully"),
            navigate("/login")
            )
          .catch(err=>alert(err));
        }
        else alert("Invalid Input,password not matching..\nPlease Enter Correct Password..")
        
     }
     else alert("invalid input")
  }

  return (
    // <form action="" onSubmit={FormSubmitted}>
    <div className='register'>
      <h1>Register</h1>
        <input type="text" name='fullname' id='fullname' placeholder='Enter your name' onChange={getInputValue} value={input.fullname} required={true}/>
        <input type="email" name="email" id="email" placeholder='Enter your Email' onChange={getInputValue} value={input.email} required={true}/>
        <input type="password" name="password" id="password" placeholder='Enter your password' onChange={getInputValue} value={input.password} required={true}/>
        <input type="password" name="password_check" id="password-check" placeholder='Re-Enter your password' onChange={getInputValue} value={input['password_check']} required={true}/>
        <button className='btn' onClick={RegisterUser}>Register</button>
        <p>or</p>
        <Link to="/login"><button type='submit' className='btn' id="reg-log">Login</button></Link>
        
    </div>
    // </form>
  )
}

export default Register