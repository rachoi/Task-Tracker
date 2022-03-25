import './App.css';


import { BrowserRouter as Router, 
  Route, 
  Routes,  
  Navigate,

} from "react-router-dom";


//Pages
import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import DashboardPage from "./Components/Dashboard.js";

function App() {
    
  return (
    <div> 
      <Router> 
          <Routes> 
            <Route exact path="/" element={<HomePage/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            {/* Add more routes to this if you want to have more user authenticated pages that redirect to home (same level protection)*/}
            {/* <Route element={<ProtectedRoute user={user} />}> 
              <Route exact path="/dashboard" element={<DashboardPage />} />
            </Route> */}
            {/* Protect a single route to redirect */}
            <Route exact path = "/dashboard" 
                  // {<ProtectedRoute user={user} loading={loading}>
                  //   <DashboardPage user={user} loading={loading}/>
                  // </ProtectedRoute>} 
                  element={<DashboardPage/>}/>
            <Route 
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
      </Router>

    </div>
  );
}

export default App;