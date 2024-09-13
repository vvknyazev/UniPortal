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
import SignUp from "./pages/SignUp";

function App() {
    const [loggedIn, setLoggedIn] = useState(true);
    const [user, setUser] = useState(null);

    console.log("loggedIn: ", loggedIn)



    useEffect(() => {
        const userData = localStorage.getItem('user');
        console.log("userDATA: ", userData);
        if (userData) {
            setUser(JSON.parse(userData));
            setLoggedIn(true);
        } else
            setLoggedIn(false);
    }, []);


  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={loggedIn ? <Dashboard /> : <Navigate to="/signin" />} />
            {/*<Route path="/signup" element={!loggedIn ? <SignUp setLoggedIn={setLoggedIn}/> : <Navigate to={"/"}/>}/>*/}
            <Route path="/signin" element={<SignIn setLoggedIn={setLoggedIn}/>} />
            <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn}/>}/>
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
