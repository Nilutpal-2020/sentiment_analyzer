// import logo from "./logo.svg";
// import "./App.css";
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import MovieReview from './components/movie_analyzer/MovieAnalyze';
import TwitterReview from './components/twitter_analyzer/TwitterAnalyze';
import Recents from './components/Recents/Recents';
import About from './components/About/About';

import UserContext from './components/Context/UserContext';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  const [ userData, setUserData ] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: {"x-auth-token": token}}
        );
      
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/", 
          {
            headers: {"x-auth-token": token}
          }
        );
        setUserData({
          token,
          user: userRes.data
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <PrivateRoute path="/" exact component={Dashboard} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/movie_review" exact component={MovieReview} />
          <Route path="/twitter_review" exact component={TwitterReview} />
          <Route path="/recents" exact component={Recents} />
          <Route path="/about" exact component={About} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
