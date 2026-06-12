import {
 useState,
 useEffect
} from "react";

import API from "../api/axios";

import DashboardLayout
from "../layouts/DashboardLayout";

import {

 PieChart,
 Pie,
 Tooltip,
 Cell,
 BarChart,
 Bar,
 XAxis,
 YAxis,
 ResponsiveContainer

}
from "recharts";

const Analytics = () => {

 const [data,setData] =
 useState(null);

 useEffect(()=>{

  fetchAnalytics();

 },[]);

 const fetchAnalytics =
 async()=>{

  const res =
  await API.get(
   "/admin/analytics"
  );

  setData(
   res.data
  );

 };

 if(!data)
 return <h2>Loading...</h2>;

 const chartData=[
 {
  name:"Completed",
  value:data.completedTasks
 },
 {
  name:"Pending",
  value:data.pendingTasks
 }
 ];

 return(

 <DashboardLayout>

  <h2>
   Analytics
  </h2>

  <div className="stats-grid">

   <div
    className="stats-card"
   >
    <h3>
     Users
    </h3>

    <h1>
     {data.totalUsers}
    </h1>
   </div>

   <div
    className="stats-card"
   >
    <h3>
     Tasks
    </h3>

    <h1>
     {data.totalTasks}
    </h1>
   </div>

  </div>

  <ResponsiveContainer
   width="100%"
   height={300}
  >

   <PieChart>

    <Pie
     data={chartData}
     dataKey="value"
    />

    <Tooltip/>

   </PieChart>

  </ResponsiveContainer>

  <ResponsiveContainer
   width="100%"
   height={300}
  >

   <BarChart
    data={chartData}
   >

    <XAxis
     dataKey="name"
    />

    <YAxis/>

    <Tooltip/>

    <Bar
     dataKey="value"
    />

   </BarChart>

  </ResponsiveContainer>

 </DashboardLayout>

 );

};

export default Analytics;