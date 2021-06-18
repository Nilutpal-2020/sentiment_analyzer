import axios from 'axios';
import React, {Component} from 'react';

import Navbar from '../Navbar/Navbar';

class Recents extends Component {
    state = {
        searches: []
    }

    componentDidMount = async () => {
        if (!localStorage.getItem('auth-token')) {
            window.location = '/login';
        }

        const config = {
            headers: {
                "x-auth-token": localStorage.getItem('auth-token')
            }
        }

        await axios.get('http://localhost:5000/searches/', config)
            .then(res => {
                // console.log(res.data)
                this.setState({
                    searches: res.data
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    onRemove = async (id) => {
        // console.log(id);
        let list = [...this.state.searches]

        // const newList = {
        //     searches: list.filter(search => search._id !== id)
        // }

        // console.log(newList)
        if (!localStorage.getItem('auth-token')) {
            window.location = '/login';
        }

        const config = {
            headers: {
                "x-auth-token": localStorage.getItem('auth-token')
            }
        }

        await axios.delete('http://localhost:5000/searches/delete/' + id, config)
            .then(() => {
                this.setState({
                    searches: list.filter(search => search._id !== id)
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        // console.log(this.state.searches);
        return (
            <div className="container">
                <Navbar />
                <h1 className="display-4 text-center">Recent Searches</h1>
                <hr className="my-2" />
                <div className="d-flex justify-content-center align-items-center flex-column">
                {
                    this.state.searches.reverse().map(search => {
                        let datetime = new Date(search.createdAt).toLocaleString();
                        return (
                            <div className="card mt-2" style={{width: '22rem', "boxSizing": "content-box"}}>
                                <div className="card-body">
                                    <h5 className="card-title font-weight-light">Keyword Searched: <span className="font-weight-normal">{search.keyword}</span></h5>
                                    <p className="card-text text-muted">Time: {datetime}</p>
                                    {/* <p className="text-muted text-center">Results:</p> */}
                                    <hr className="my-4" />
                                    <h6 className="card-subtitle mb-2 text-muted">Positive: {search.result[0]}%</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Negative: {search.result[1]}%</h6>
                                </div>
                                <button onClick={() => this.onRemove(search._id)} className="btn btn-danger btn-sm">DELETE</button>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

export default Recents;