// App.js
import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Grades from "./pages/Grades";
import Course from "./pages/Course";
import Settings from "./pages/Settings";
import Specializations from "./pages/Specializations";
import {useCookies} from "react-cookie";
import News from "./pages/News";
import Faq from "./pages/FAQ";

function App() {
    const [cookies] = useCookies(['user']);
    const [loggedIn, setLoggedIn] = useState(!!cookies.user);

    console.log("loggedIn: ", loggedIn)

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                console.log("GETEERsfdsf")
                const response = await fetch('http://localhost:5000/api/check-login');
                const data = await response.json();
                console.log("data: ", data)
                if (data.loggedIn) {
                    setLoggedIn(true);
                }
            } catch (error) {
                console.error('Error checking login status:', error.message);
            }
        };

        checkLoginStatus();
    }, [loggedIn, cookies]);


  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={loggedIn ? <Dashboard /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={<SignIn setLoggedIn={setLoggedIn}/>} />
            <Route path="/grades" element={loggedIn ? <Grades /> : <Navigate to="/signin" />} />
            <Route path="/course" element={loggedIn ? <Course /> : <Navigate to="/signin" />} />
            <Route path="/news" element={loggedIn ? <News /> : <Navigate to="/signin" />} />
            <Route path="/faq" element={loggedIn ? <Faq /> : <Navigate to="/signin" />} />
            <Route path="/spec" element={loggedIn ? <Specializations /> : <Navigate to="/signin" />} />
            <Route path="/settings" element={loggedIn ? <Settings setLoggedIn={setLoggedIn}/> : <Navigate to="/signin" />} />
        </Routes>

      </BrowserRouter>
  );
}

export default App;