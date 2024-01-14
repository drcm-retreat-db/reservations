import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

/*Custom Components */
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import NotFound from "./pages/notFound";
import Dashboard from "./pages/dashboard";
import { UserInfoProvider } from "./globalstate/context";
import ResetPassword from "./pages/resetPassword";
import NavbarComponent from "./components/navbar/navbar";
import AdminDashboard from "./pages/adminDashboard";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href")

function App() {
  return (
    <>
      <UserInfoProvider>
        <Router basename={baseUrl}>
          <NavbarComponent />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resetpwd" element={<ResetPassword />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/admindb" element={<AdminDashboard/>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </UserInfoProvider>
    </>
  );
}

export default App;
