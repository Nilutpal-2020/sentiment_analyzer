import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import UserContext from '../Context/UserContext';

function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);

    // const history = useHistory();

    // const handleRegister = () => {
    //     history.push("/register");
    // }

    // const handleLogin = () => {
    //     history.push("/login");
    // }

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");

        window.location = "/";
    };


    return (
        <Aux>
            {
                userData.user ? 
                <Aux>
                    {/* <li className="nav-item">
                        <span className="nav-link">Hi, {userData.user.username}</span>
                    </li> */}
                    {/* <li className="nav-item"> */}
                        <button className="nav-link btn btn-light" onClick={logout}>Log Out</button> 
                    {/* </li>  */}
                </Aux>
                :
                <Aux>
                    {/* <li className="nav-item"> */}
                        <Link to="/register" style={{textDecoration: 'none'}}><button className="btn btn-light">Register</button></Link>
                    {/* </li> */}
                    {/* <li className="nav-item"> */}
                        <Link to="/login" style={{textDecoration: 'none'}}><button className="btn btn-light ml-2">Login</button></Link>
                    {/* </li> */}
                </Aux>
            }
        </Aux>
    );
}

export default AuthOptions;