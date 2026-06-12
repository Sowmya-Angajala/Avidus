import {
 useEffect,
 useState
} from "react";

import API from "../api/axios";

import DashboardLayout
from "../layouts/DashboardLayout";

const AdminTasks = () => {

 const [tasks,setTasks] =
 useState([]);

 const fetchTasks =
 async()=>{

  const res =
  await API.get(
   "/admin/tasks"
  );

  setTasks(
   res.data
  );
 };

 useEffect(()=>{
  fetchTasks();
 },[]);

 const deleteTask =
 async(id)=>{

  await API.delete(
   `/admin/tasks/${id}`
  );

  fetchTasks();

 };

 return(

 <DashboardLayout>

  <h2>
   Task Monitoring
  </h2>

  <div className="task-grid">

   {tasks.map(task=>(

    <div
     className="task-card"
     key={task._id}
    >

     <h3>
      {task.title}
     </h3>

     <p>
      {task.description}
     </p>

     <p>
      Owner:
      {
       task.createdBy?.name
      }
     </p>

     <p>
      Status:
      {task.status}
     </p>

     <button
      className="delete-btn"
      onClick={()=>
      deleteTask(
       task._id
      )}
     >
      Delete
     </button>

    </div>

   ))}

  </div>

 </DashboardLayout>

 );

};

export default AdminTasks;