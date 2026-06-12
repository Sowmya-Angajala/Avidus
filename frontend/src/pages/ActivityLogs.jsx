import {
 useEffect,
 useState
} from "react";

import API from "../api/axios";

import DashboardLayout
from "../layouts/DashboardLayout";

const ActivityLogs = () => {

 const [logs,setLogs] =
 useState([]);

 useEffect(()=>{

  fetchLogs();

 },[]);

 const fetchLogs =
 async()=>{

  const res =
  await API.get(
   "/admin/logs"
  );

  setLogs(
   res.data
  );

 };

 return(

 <DashboardLayout>

  <h2>
   Activity Logs
  </h2>

  <div className="logs">

   {logs.map(log=>(

    <div
     key={log._id}
     className="log-card"
    >

      <h4>
       {log.action}
      </h4>

      <p>
       {log.details}
      </p>

      <small>
       {
        new Date(
         log.createdAt
        )
        .toLocaleString()
       }
      </small>

    </div>

   ))}

  </div>

 </DashboardLayout>

 );

};

export default ActivityLogs;