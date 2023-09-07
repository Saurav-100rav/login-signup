import { BrowserRouter as Router , Routes, Route, Navigate } from 'react-router-dom';

import Homepage from "./components/homepage/Homepage"
import Login from "./components/login/Login"
import Register from "./components/register/Register";
import { useState } from 'react';

function App() {
  const [currUser,setuser]=useState();
  const getuservalue = (value)=>{
       setuser(value);
      console.log("hi",typeof(value.name));
  }
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={ (currUser) ? <Homepage setuser={setuser} user={currUser}/> : <Login setUser={getuservalue}/> }/>
          <Route path='/login' element={<Login setUser={getuservalue}/>} />
          <Route path='/register' element={<Register/>} />
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
