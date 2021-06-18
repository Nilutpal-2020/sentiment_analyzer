import React, {Component} from 'react';
// import AuthOptions from '../components/auth/AuthOptions';
import {Link} from 'react-router-dom';

import classes from './Dashboard.module.css';
import axios from 'axios';

import movie_art from '../images/movie_art.jpg';
import twitter_art from '../images/twitter_tweets.png';
// import Recents from './Recents/Recents';
import Navbar from './Navbar/Navbar';

class Dashboard extends Component {
    state = {
        texts: '',
        review: ''
    }

    onTextChange = (text) => {
        this.setState({
            texts: text
        })
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const keyword = this.state.texts;

        try {
            const data = {keyword};
            const res = await axios.post("http://localhost:8000/api/sentiment/", data);

            this.setState({
                review: res.data
            })
        } catch (err) {
            console.log(err.response.data)
        }
    }

    render() {
        return (
            <div className={classes.Dash +  " container text-center"}>
                {/* <div className="conatiner nav justify-content-between">
                    <li className="nav-item">
                        <h3 className="font-weight-bold mt-2">SAML</h3>
                    </li>
                    <li className="nav-item">
                        <Link to="/about"><p className="font-weight-light mt-3 ml-0">About</p></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/recents"><p className="font-weight-light mt-3 ml-0">View Recent Searches</p></Link>
                    </li>
                    <span className="d-flex mt-2"><AuthOptions /></span>
                </div> */}
                <Navbar />
                <div className={classes.Jumbo + " card text-center"} >
                    <h1 className="font-weight-light card-header">TEST SENTIMENT IN TEXTS</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="Text">Enter some texts here... </label>
                            <input 
                                type="text"
                                className="form-control text-center"
                                id="Text"
                                placeholder="Enter some texts here..."
                                required
                                onChange={(e) => this.onTextChange(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-success">ANALYZE</button>
                    </form>
                    <p className="display-4 mt-3">
                        {this.state.review[this.state.review.length - 2] === '1' ? 'Positive 👍': this.state.review[this.state.review.length - 2] === '0' ? 'Negative 👎' : '⌨'}
                    </p>
                </div>
                <div className="card-deck m-2">
                    <div className={classes.Cards + " card"} >
                        <img className="card-img-top" src={movie_art} alt="Movie logo" height="240" width="300" />
                        <div className="card-body text-dark">
                            <h5 className="card-title text-uppercase font-weight-bold">Movie Review Analysis</h5>
                            <p className="card-text font-weight-light">Want to know how a movie is performing among the twitter tweets? Click here...</p>
                            <p className="card-text"><small className="text-muted">{Date()}</small></p>
                            <Link to="/movie_review"><p className="btn btn-outline-info">START</p></Link>
                        </div>
                    </div>
                    <div className={classes.Cards + " card"}>
                        <img className="card-img-top" src={twitter_art} alt="Movie logo" height="240" width="300" />
                        <div className="card-body text-dark">
                            <h5 className="card-title text-uppercase font-weight-bold">Twitter Tweets Analysis</h5>
                            <p className="card-text font-weight-light">Want to know how certain topic is being discussed among the twitter tweets? Click here...</p>
                            <p className="card-text"><small className="text-muted">{Date()}</small></p>
                            <Link to="/twitter_review"><p className="btn btn-outline-info">START</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;