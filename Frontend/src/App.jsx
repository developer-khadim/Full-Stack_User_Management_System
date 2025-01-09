// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Components/About';
import SignIn from './Components/SignIn';
import SignUP from './Components/SignUP';

function App() {
  
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUP/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;