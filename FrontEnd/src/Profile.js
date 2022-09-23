import React, { useEffect, useState } from 'react'
import axios from "axios"
import MyTasks from './MyTasks';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({})
  const [tasks, setTasks] = useState([]);
  const [editProfileData, setEditProfileData] = useState({
    name: "", city: "", state: "", age: ""
  });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getProfile = async (id) => {
      const { data } = await axios.get(`http://localhost:5005/auth/profile/${id}`);
      setProfileData(user);
      setEditProfileData(user);
      setTasks(data.tasks);
    }
    if (user) {
      getProfile(user._id);
    } else {
      navigate("/login")
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editProfileData.name.length < 5) {
      alert("Name must be of atleast 5 characters and must be in valid format");
      return;
    }
    if (editProfileData.state.length < 2 ) {
      alert("State name must be of atleast 2 characters and must be in valid format")
      return;
    }
    if (editProfileData.city.length < 2 ) {
      alert("City name must be of atleast 2 characters and must be in valid format")
      return;
    }
    if (editProfileData.age<5) {
      alert("Minimum age required is 5 and must be in valid format");
      return;
    }
    const { data } = await axios.put(`http://localhost:5005/auth/profile/edit/${user._id}`, editProfileData);
    localStorage.setItem('user', JSON.stringify(data));
    setProfileData(data);
  }

  return (
    <div>
      <Navbar />
      <div className="container-fluid p-5 bg-primary "  >
        {/* profile view */}
        <div className='card p-2'>
          {profileData ?
            <div className='card mb-2 p-2 h6'>
              <h3 className='text-center '>My Profile</h3>
              <hr />
              <p  >Name: {profileData.name}</p>
              <p>Email: {profileData.email}</p>
              <p>City: {profileData.city}</p>
              <p>State: {profileData.state}</p>
              <p>Age: {profileData.age}</p>
            </div> :
            <span>
              User Not Yet Loaded
            </span>}
          {/* Edit Profile */}
          <div className='card p-4'>
            <h3 className='text-center'>Edit Profile</h3>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-3">
                <label >Name: </label>
                <input className="form-control" type="text" placeholder="Name" value={editProfileData.name} onChange={(e) => { setEditProfileData({ ...editProfileData, name: e.target.value }) }} />
              </div>
              <div className="mb-3 mt-3">
                <label>City: </label>
                <input className="form-control" type="text" placeholder="City" value={editProfileData.city} onChange={(e) => { setEditProfileData({ ...editProfileData, city: e.target.value }) }} />
              </div>
              <div className="mb-3 mt-3">
                <label>State: </label>
                <input className="form-control" type="text" placeholder="State" value={editProfileData.state} onChange={(e) => { setEditProfileData({ ...editProfileData, state: e.target.value }) }} />
              </div>
              <div className="mb-3 mt-3">
                <label>Age: </label>
                <input className="form-control" type="text" placeholder="Age" value={editProfileData.age} onChange={(e) => { setEditProfileData({ ...editProfileData, age: e.target.value }) }} />
              </div>
              <div className='text-center'>
                <button className="btn btn-success" type='submit' >Submit</button>
              </div>
            </form>
          </div>
        </div>
        {/* My Tasks */}
        {tasks &&
          <MyTasks tasks={tasks} setTasks={setTasks} />
        }
      </div>
    </div>
  )
}

export default Profile