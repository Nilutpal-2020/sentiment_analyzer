import React, {useState, useContext} from 'react';
import axios from 'axios';

import classes from './Auth.module.css';
import ErrorNotice from '../misc/ErrorNotice';
import UserContext from '../Context/UserContext';
import {Link} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [visible, setVisibility] = useState('password');

    const {setUserData} = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();

        try {
            const loginUser = {email, password};
            const loginRes = await axios.post(
                "http://localhost:5000/users/login", loginUser
            );

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            localStorage.setItem("auth-token", loginRes.data.token);

            window.location="/";
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    const toggleVisibility = () => {
        if (visible === 'password') {
            setVisibility('text');
        } else {
            setVisibility('password');
        }
    }

    return (
        <div className="container-fluid">
            <div className={classes.Auth + " jumbotron container"}>
                <h2 className="font-weight-normal text-info">Welcome to <br /> Sentiment Analysis using Machine Learning</h2>
                <hr className="my-3" />
                <div className="card-body">
                    {error && <ErrorNotice message={error} noticeColor="alert-danger" clearError={() => setError(undefined)} />}
                    <form onSubmit={submit}>
                        <div className="form-group">
                            <label htmlFor="login-email">Email:</label>
                            <input 
                                id="login-email"
                                type="email"
                                className="form-control" 
                                placeholder="Enter Email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password">Password:</label>
                            <input 
                                id="login-password"
                                type={visible}
                                className="form-control" 
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        </div>
                        <div className="form-group custom-control custom-checkbox">
                            <input type="checkbox" 
                                id="customCheck"
                                onClick={toggleVisibility}
                                className="custom-control-input" />
                            <label className="custom-control-label" htmlFor="customCheck">Show Password</label>
                        </div>
                        <button type="submit" className="btn btn-info">Log In</button>
                    </form>
                    <div className="w-100 mt-2">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </div>
                <div role="button" className="badge badge-light font-weight-normal" onClick={() => {window.location = "/register"}}>
                    Don't have an account? <strong style={{color: '#24a0ed'}}>Sign up</strong></div>
            </div>
        </div>
    )
}

export default Login;