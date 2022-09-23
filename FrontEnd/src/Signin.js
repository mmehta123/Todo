import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
const Signin = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "", password: ""
    });
    useEffect(() => {
        if (localStorage.getItem("user")){
            navigate("/");
        }
    },[]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if(userData.email.length<5 || userData.password.length<5){
            alert("Email and Password are not Valid");
        }
        else{
            const { data } = await axios.post('http://localhost:5005/auth/login', userData);
            if(data.status===true){
                localStorage.setItem('user', JSON.stringify(data));
                navigate("/");
            }else{
                alert(data.msg);
            }
        }
    }
    return (
        <div className='container-fluid bg-primary d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
            <form className='card p-2' style={{ width: "60vw" }} onSubmit={handleOnSubmit}>
                <h2 className='text-center'>Login</h2>
                <hr/>
                <input type='email' className='form-control mb-3' placeholder='Email' value={userData.email} onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }} />
                <input type='password' className='form-control mb-3' placeholder='Password' value={userData.password} onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }} />
                <button className="btn btn-danger" type='submit' >Sign In</button>
                <span className="text-center m-2">Not Have An Account? <Link  to="/register" style={{textDecoration:"none"}}>Register</Link></span>
            </form>
        </div>
    )
}

export default Signin