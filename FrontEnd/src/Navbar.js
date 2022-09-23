import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./"
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout=()=>
  {
    navigate("/login");
    localStorage.clear();
  }
  return (
    <nav className="navbar navbar-expand-sm bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link" style={{border:"3px solid",borderRadius:"1rem"}}><h5 className="h2">TO-DO</h5></Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link"><button className="h6 btn btn-primary">Profile</button></Link>
          </li>
          <li className="nav-item" >
            <Link to="/" className="nav-link"><button onClick={handleLogout} className="h6 btn btn-danger">Logout</button></Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar