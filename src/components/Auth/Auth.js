import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
//import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"

import "./index.css";
const Auth = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [loginBtn, setLoginBtn] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [gender, setGender] = useState("");
  const [phNumber, setPhnNumber] = useState("");
  //const [showpassword,setShowpassword]=useState(false)
  const[confirmPassword, setConfirmPassword] = useState(false)
  const onSubmitSuccess = jwtToken =>{
    Cookies.set('jwt_token', jwtToken) //storing the token from server 
    navigate("/");
}

  const onSubmitFailure = errormsg=>{
    setSubmitError(true);
    setErrorMsg(errormsg)
}

  const renderUserName = ()=>{
    return(
        <>
            <label 
                className='label'
                htmlFor="name"
            >
                UserName
            </label>
            <input 
                type="text" 
                id="name"
                placeholder='Enter Your name'
                className='  user-input'
                value={name}
                onChange={((e)=>setName(e.target.value))}
            />
        </>
    )

}
const renderEmail =()=>{
  return(
    <>
      <label className="label" htmlFor="email">Email</label>
      <input 
      type="text"
      id="email"
      placeholder="Enter Your Email"
      value={email}
      className="user-input"
      onChange={((e)=>setEmail(e.target.value))}
      />
    </>
  )
}
const renderPhnNumber =()=>{
  return(
    <>
      <label className="label" htmlFor="phNumber">Phone Number</label>
      <input
        type="text"
        id="phNumber"
        className="user-input"
        value={phNumber}
        placeholder="Enter your Number"
        onChange={((e)=>setPhnNumber(e.target.value))}

      />
    </>
  )
}
const renderGender = ()=>{
  return(
      <>
          <label className='label'htmlFor="gender"> Gender</label>
          <input 
              type="text" 
              id="gender"
              placeholder='Enter Your Gender'
              className='user-input'
              value={gender}
              onChange={((e)=>setGender(e.target.value))}
          />
      </>
  )
}
const renderPassword =()=>{
  return(
    <>
      <label className="label" htmlFor="password">Password</label>
      <input 
      type="password"
      id="password"
      placeholder="Enter Your Password"
      value={password}
      className="user-input"
      onChange={((e)=>setPassword(e.target.value))}
      />
    </>
  )
}

const renderConfirmPassword =()=>{
  return(
    <>
      <label className="label" htmlFor="confirmPassword ">ConfirmPassword </label>
      <input 
      type="password"
      id="confirmPassword"
      placeholder="Enter Your Password"
      // value={confirmPassword}
      className="user-input"
      // onChange={((e)=>setConfirmPassword(e.target.value))}
      />
    </>
  )
}


const onSubmitForm = async event =>{
  event.preventDefault();
  if(loginBtn === "login"){
      const url = "http://localhost:6600/auth/login";
      const options = {
          method:"POST",
          headers:{
              'Content-Type':'application/json',
          },
          body: JSON.stringify({
              email,
              password
          }),
      }
      const response = await fetch(url, options)
      const data = await response.json()

      if(response.ok === true){
          onSubmitSuccess(data.token) //calllin login succes function
      }else{
          //handle failure 
          onSubmitFailure(data.message)
      }
     
  }else{
      //do sign up call
      if(password.length >= 5 && password.length <= 10){
          const url = "http://localhost:6600/auth/signup";
          const options = {
              method:"POST",
              headers:{
                  'Content-Type':'application/json',
              },
              body: JSON.stringify({
                  name,
                  email,
                  phoneNumber:phNumber,
                  gender,
                  password,
                  confirmPassword
              }),
          }
          const response = await fetch(url, options)
          const data = await response.json()
          
          if(response.ok === true){
              setLoginBtn("login")
          }else{
              onSubmitFailure(data.message)
          }
      }
     
  }
  setName("")
  setEmail("")
  setPassword("")
  setConfirmPassword("")
  setGender("")
  setPhnNumber("")
}
useEffect(()=>{
  const token = Cookies.get('jwt_token');
  if(token !== undefined){
      navigate("/")
   }
})
// Cookies.remove('jwt_token')
  return (
    <div className="jobby-app-container">
      <div className="card-container">
        <div>
          {/* <h1><span className="aa">PFX</span>WATCH</h1> */}
          <img src="PFX_Watch\PFX Watch Black.png" alt="PFX_Watch logo" className="w-25"/>
        </div>
        <div className="signup-grid">
          
          <form className='form-container'onSubmit={onSubmitForm}>
          <div className="row">
            <div  className={loginBtn === "login" ? "input-container" : "input-container col-6"}>
              {loginBtn === 'signup' ? renderUserName():""}
              </div>
            <div className={loginBtn === "login" ? "input-container" : "input-container col-6"}>
              {renderEmail()}</div>
          </div>
           
           
           <div className="row">
           <div className={loginBtn === "login" ? "input-container" : "input-container col-6"}>{renderPassword()}</div>
           <div className={loginBtn === "login" ? "input-container" : "input-container col-6"}>{loginBtn === 'signup' ? renderConfirmPassword():""}</div>
           </div>
           
           <div className="row">
           <div className='input-container col-6'>{loginBtn === 'signup' ? renderPhnNumber():""}</div>
            <div className='input-container col-6 ' >{loginBtn === 'signup' ? renderGender():""}</div>
           </div>
           <button className='login-button' type='submit'>{loginBtn === 'login'? "Login":"Signup"}</button>
           {showSubmitError && <p className='error-msg'>{errorMsg}</p>}

           </form>
           <button className='toggle-button' onClick={() => setLoginBtn(loginBtn === 'login' ? 'signup' : 'login')}>
            {loginBtn === 'login' ? "Don't have an account?" : "Already have an account?"}
          </button>

      
        </div>
      </div>
    </div>
  );
};

export default Auth;