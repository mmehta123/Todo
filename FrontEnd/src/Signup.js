import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';



const Signup = () => {
    const navigate=useNavigate();
    const [userData, setUserData] = useState({
        name: "", email: "", password: ""
    });
    useEffect(() => {
        if(localStorage.getItem('user')){
            navigate("/");
        }
    },[]);
    
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (userData.name.length<3 || userData.email.length<5 || userData.password.length<5){
            alert("Please enter Valid Data");
        }else{
            const { data } = await axios.post('http://localhost:5005/auth/register', userData);
            if(data.status===true){
                localStorage.setItem('user', JSON.stringify(data));
                navigate("/");
            }else{
                alert(data.msg);
            }
        }
    }
    return (
        <div className='container-fluid bg-primary d-flex align-items-center justify-content-center' style={{height:"100vh"}}>
            <form className='card p-2 ' onSubmit={handleOnSubmit} style={{ width: "60vw"}}>
            <h2 className='text-center'>Register</h2>
            <hr/>
                <input className='form-control mb-3' type='text' placeholder='Name' value={userData.name} onChange={(e) => { setUserData({ ...userData, name: e.target.value }) }} />
                <input className='form-control mb-3' type='email' placeholder='Email' value={userData.email} onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }} />
                <input className='form-control mb-3' type='password' placeholder='Password' value={userData.password} onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }} />
                <button className="btn btn-danger" type='submit' >Submit</button>
                <span className="text-center m-2">Already Have An Account? <Link to="/login" style={{ textDecoration: "none" }}>Login</Link></span>
            </form>
        </div>
    )
}

export default Signup;