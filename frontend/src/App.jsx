import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./routes/ProtectedRoute";
import MyTasks from "./pages/MyTasks";
import Dashboard from "./pages/Dashboard";
import AdminRoute from "./routes/AdminRoute";
import AdminUsers from "./pages/AdminUsers";
import AdminTasks from "./pages/AdminTasks";
import ActivityLogs from "./pages/ActivityLogs";
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";

function App() {

 return (

 <BrowserRouter>

  <Routes>
    <Route
 path="/"
 element={<Home />}
/>

   <Route
    path="/login"
    element={<Login/>}
   />

   <Route
    path="/register"
    element={<Register/>}
   />

   {/* <Route
    path="/dashboard"
    element={
     <ProtectedRoute>
       Dashboard
     </ProtectedRoute>
    }
   /> */}
   <Route
 path="/tasks"
 element={
  <ProtectedRoute>
   <MyTasks />
  </ProtectedRoute>
 }
/>

<Route
 path="/dashboard"
 element={
  <ProtectedRoute>
   <Dashboard/>
  </ProtectedRoute>
 }
/>
<Route
 path="/admin/users"
 element={
  <AdminRoute>
   <AdminUsers/>
  </AdminRoute>
 }
/>

<Route
 path="/admin/tasks"
 element={
  <AdminRoute>
   <AdminTasks/>
  </AdminRoute>
 }
/>

<Route
 path="/admin/logs"
 element={
  <AdminRoute>
   <ActivityLogs/>
  </AdminRoute>
 }
/>

<Route
 path="/analytics"
 element={
  <AdminRoute>
   <Analytics/>
  </AdminRoute>
 }
/>

  </Routes>

 </BrowserRouter>

 );

}

export default App;