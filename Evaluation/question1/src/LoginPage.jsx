import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

const LoginPage=({setIsAuthenticated})=>{
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const emailRef=useRef(null);
    const navigate=useNavigate();
    useEffect(()=>{
        emailRef.current.focus();
    },[]);
    const handleLogin=(e)=>{
        e.preventDefault();
        if(email==="admin@gmail.com"&&password==="admin1234"){
            alert('Login Success');
            setIsAuthenticated(true);
            navigate('/admin');
        }
        else{
            alert("Wrong email or password")
        }
    };
    return(
        <div style={{padding:'50px',textAlign:'center'}}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={{display:'inline-block', textAlign:'left'}}>
                <div>
                    <label>Email:</label>
                    <input ref={emailRef}type="email" value={email} 
                    onChange={(e)=>
                        setPassword(e.target.value)} required/>
                </div><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default LoginPage;