import axios from 'axios';
import React from 'react'

const MyTasks = ({ tasks, setTasks }) => {

  const handleDone = async (id, e) => {
    e.preventDefault();
    const { data } = await axios.put(`http://localhost:5005/tasks/${id}`);
    const updatedTasks = tasks.map((task) => {
      if (task._id === data._id) {
        task.isDone = data.isDone;
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const handleDelete = async (id, e) => {
    e.preventDefault();
    const { data } = await axios.delete(`http://localhost:5005/tasks/delete/${id}`);
    setTasks(tasks.filter((task) => task._id !== data._id));
  }

  return (
    <div className='card mt-5 text-dark '>
      <h3 className='text-center mt-1 '>My Tasks</h3>
      {tasks ?
        tasks.map((item, i) => {
          return (
            <div key={i} className="m-5 mt-0  mb-0 card-body ">
              <span className='display-6'>{item.desc}</span>
              <p className={item.isDone ? "text-success" : "text-danger"}>{item.isDone ? "Completed" : "Pending"}</p>
              <div className='btn-group'>
                <button className="btn btn-primary " onClick={(e) => handleDone(item._id, e)}>{item.isDone ? "Incomplete?" : "Complete?"}</button>
                <button className="btn btn-danger " onClick={(e) => handleDelete(item._id, e)}>Delete</button>
              </div>
              <hr />
            </div>
          )
        }) : (<div>NO Taks To Show</div>)
      }
    </div>
  )
}

export default MyTasks