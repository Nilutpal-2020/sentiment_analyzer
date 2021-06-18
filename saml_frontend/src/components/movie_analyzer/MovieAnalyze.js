import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Report from '../Report/Report';
class MovieAnalyze extends Component {
    state = {
        keyword: '',
        count: 10,
        tweets: [],
        average: '',
        values: []
    }

    onKeywordChange = (name) => {
        // event.preventDefault();
        this.setState({
            keyword: name
        })
    }

    onCountChange = (count) => {
        this.setState({
            count: parseInt(count)
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        // console.log(this.state);

        const title = this.state.keyword;
        const count = this.state.count;

        try {
            const key = {title, count};
            const resKeyword = await axios.post("http://localhost:8000/api/movies/", key);

            this.setState({
                tweets: resKeyword.data
            })
    
            // window.location = '/movie_review'
        } catch (err) {
            console.log(err.response.data)
        }

        let new_arr = []
        this.state.tweets.map(tweet => {
            new_arr.push(parseInt(tweet[1]))
            return tweet[1]
        })

        let new_data = []
        let positive = 0
        let negative = 0
        if (new_arr.length > 0) {
            for (let i = 0; i < new_arr.length; i++){
                if (new_arr[i] === 1) {
                    positive += 1;
                } else {
                    negative += 1;
                }
            }
    
            new_data = new_data.concat([positive, negative])           
        }

        const total = new_arr.length > 0 ? new_arr.reduce((a, b) => a + b) : 0
        
        this.setState({
            values: new_data.length > 0 ? new_data : [],
            average: Math.round((total / new_arr.length) * 100).toString()
        })

        if (this.state.values !== undefined) {
            const res = this.state.values.map(val => val / this.state.count * 100)

            const data = {
                keyword: this.state.keyword, 
                result: res
            };

            if (!localStorage.getItem('auth-token')) {
                window.location = '/login';
            }
    
            const config = {
                headers: {
                    "x-auth-token": localStorage.getItem('auth-token')
                }
            }

            await axios.post('http://localhost:5000/searches/add', data, config)
                .then(() => console.log("Save successful"))
                .catch(err => console.log(err));
        }
    }

    // calculateAverage = () => {
        
    // }

    render() {
        // console.log(this.state.keyword, this.state.values, this.state.average)
        return (
            <div className="container jumbotron mt-3 bg-light text-center">
                <h5 className="display-4 text-uppercase">Movie Review Analysis</h5>
                <hr className="my-4" />
                <form onSubmit={this.onSubmit} className="was-validated">
                    <div className="form-group">
                        <label htmlFor="Keyword">Provide a movie name: </label>
                        <input 
                            type="text"
                            className="form-control"
                            id="Keyword"
                            placeholder="Enter movie name"
                            required
                            onChange={(e) => this.onKeywordChange(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Count">Total no. of inputs: </label>
                        <input 
                            type="number"
                            className="form-control"
                            id="Count"
                            placeholder={this.state.count}
                            min="10"
                            max="100"
                            onChange={(e) => this.onCountChange(e.target.value)} />
                        <div className="invalid-feedback">Choose between 10 and 100.</div>
                    </div>
                    <button type="submit" className="btn btn-outline-info">ANALYZE</button>
                </form>
                {this.state.average ? <p className="mt-3">Positive Reviews: {this.state.average}% </p> : null }
                {this.state.values.length > 0? 
                    <Report dataset={this.state.values} />
                    : null
                }
                {this.state.average ? <p className="font-weight-bold text-uppercase">Twitter Tweets Analyzed: </p> : null }
                <ol className="text-left" >
                    {this.state.tweets.map(tweet => {
                        return <li>{tweet[0]} : {tweet[1]}</li>
                    })}
                </ol>
                <div className="text-left">
                    <Link to="/"><p className="text-info">&#60; Go Back</p></Link>
                </div>
            </div>
        )
    }
}

export default MovieAnalyze;