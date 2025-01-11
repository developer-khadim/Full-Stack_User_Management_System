
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUP from './Pages/SignUP';
import User_Dashbord from './Pages/User_Dashbord';
import { Admin_Dashbord } from './Pages/Admin_Dashbord';
import About from './Pages/About ';
import ForgetPassword from './Components/Forgot_Pasword';
import Futures from './Pages/Futures';

function App() {
  
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUP/>} />
            <Route path="/User_dashboard" element={<User_Dashbord/>} /> // Fixed typo in route
            <Route path="/Admin_dashboard" element={<Admin_Dashbord/>} />
            <Route path='/forgot_password' element={<ForgetPassword/>}  />
            <Route path='futures' element={<Futures/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;