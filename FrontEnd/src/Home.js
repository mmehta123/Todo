import { useState, useEffect } from 'react';
import axios from "axios";
import MyTasks from './MyTasks';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useNavigate, Link } from "react-router-dom";
import Navbar from './Navbar';

const Home = () => {
    const [newTask, setNewTask] = useState({
        desc: "", isDone: false
    });
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user) {
            const getTasks = async (id) => {
                const { data } = await axios.get(`http://localhost:5005/tasks/${id}`);
                setTasks(data);
            }
            getTasks(user._id);
        } else {
            navigate("/login");
        }
    }, []);


    const addTask = async (e) => {
        e.preventDefault();
        if (newTask.desc.length === 0) {
            alert("Cannot Add an empty task");
            return;
        }
        const { data } = await axios.post("http://localhost:5005/tasks", { ...newTask, creator: user._id });
        setTasks([...tasks, data]);
        setNewTask({desc:"",isDone:false});
    }

    return (
        <div>
            <Navbar />
            {user ?
                <div className="container-fluid p-5 bg-primary text-white  " >
                    <div className='card p-5'>
                        <div className="alert alert-info h5">
                            <strong>Add Your Task</strong>
                        </div>
                        <form className='text-center' onSubmit={addTask}>
                            <input className="form-control p-3" type="text" placeholder='Enter Your Task' value={newTask.desc} onChange={(e) => { setNewTask({ ...newTask, desc: e.target.value }) }} />
                            <button type='submit' className='btn btn-warning mt-4' >
                                <span className={newTask.desc && "spinner-grow spinner-grow-sm"}></span>
                                Submit</button>
                        </form>
                    </div>
                    <MyTasks tasks={tasks} setTasks={setTasks} />
                </div> :
                <p className='text-center text-danger h3'>You Should Login First!
                    <Link className='nav-link text-primary' to="/login">
                        <button className='btn btn-info text-white'>Login</button>
                    </Link>
                </p>
            }
        </div>
    )
}

export default Home;