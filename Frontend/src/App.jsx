import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store/store'

// Components
import Navbar from './Components/Navbar';
import ForgetPassword from './Components/Forgot_Pasword';
import GoogleTokenHandler from './Components/GoogleTokenHandler'

// Pages
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUP from './Pages/SignUP';

import User_Dashborad from './Pages/User_Dashbord';
import { Admin_Dashbord } from './Pages/Admin_Dashbord';
import About from './Pages/About ';
import Futures from './Pages/Futures'
import UserProtectWrapper from './Pages/UserProtectWrapper'

import User_Dashbord from './Pages/User_Dashbord';
import { Admin_Dashbord } from './Pages/Admin_Dashbord';
import About from './Pages/About ';
import ForgetPassword from './Components/Forgot_Pasword';
import Futures from './Pages/Futures';


function App() {
  
  
  return (
    <Provider store={store}>
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUP/>} />

            <Route path='google_token' element={<GoogleTokenHandler/>} />
            <Route path="/User_dashboard" element={ 
              <UserProtectWrapper>
                 <User_Dashborad/>
            </UserProtectWrapper>
            } />

            <Route path="/User_dashboard" element={<User_Dashbord/>} /> // Fixed typo in route

            <Route path="/Admin_dashboard" element={<Admin_Dashbord/>} />
            <Route path='/forgot_password' element={<ForgetPassword/>}  />
            <Route path='futures' element={<Futures/>} />
          </Routes>
        </main>
      </div>
    </Router>
    </Provider>
  );
}

export default App;