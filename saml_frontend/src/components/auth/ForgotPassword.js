import React, {useState} from 'react';
import axios from 'axios';

import classes from './Auth.module.css';
import ErrorNotice from '../misc/ErrorNotice';
import {Link} from 'react-router-dom';

function ForgotPassword(){
    const [email, setEmail] = useState();
    const [error, setError] = useState();
    const [resMsg, setMsg] = useState();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const User = {email};
            const response = await axios.post("http://localhost:5000/users/forgot-password", User);

            response.data.msg && setMsg(response.data.msg);
            // console.log(response.data.msg);
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
        <div className="container">
            <div className={classes.Auth + " jumbotron m-3"}>
                <h2 className="font-weight-normal text-info text-center">Wanna reset your password?</h2>
                <hr className="my-3 w-50" />
                {error && <ErrorNotice message={error} noticeColor="alert-danger" clearError={() => setError(undefined)} />}
                {resMsg && <ErrorNotice message={resMsg} noticeColor="alert-success" clearError={() => setMsg(undefined)} />}
                <div className="card-body p-5">
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
                        <button type="submit" className="btn btn-info">Reset Password</button>
                    </form>
                    <hr className="my-4 w-50" />
                    <div className="w-100 mt-2">
                        <Link to="/login">Go to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;