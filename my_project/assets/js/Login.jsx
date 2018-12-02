import React, { Component } from 'react';
import '../css/app.css';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import {FaLock, FaEnvelope} from 'react-icons/fa'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToMain: false
        };
        this.login = this.login.bind(this);
    }

    login() {
        axios
            .post("auth/login", {email: this.state.email, password: this.state.password})
            .then(res => {
                window.localStorage.setItem("userToken", res.data.token);
                this.setState({
                    redirectToMain: true
                })
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.error_message
                });
            });
    }

    render() {
        const redirectToMain = this.state.redirectToMain;
        if (redirectToMain === true) {
            return <Redirect to="/main" />
        }
        return (
                <header className="App-header">
                    {this.state.error ?
                        <div className='row'>
                            <div className='col alert alert-danger'>
                                {this.state.error}
                            </div>
                        </div> : ''}
                    <form method="post">
                        <div className='row'>
                            <div className="col-1">
                                <FaEnvelope/>
                            </div>
                            <div className="col">
                                <div className="form-group has-feedback">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="E. paštas"
                                        onChange={e =>
                                            this.setState({
                                                email: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className="col-1">
                                <FaLock/>
                            </div>
                            <div className="col">
                                <div className={"form-group has-feedback"}>
                                    <input
                                        type="password"
                                        className={"form-control"}
                                        placeholder="Slaptažodis"
                                        onChange={e =>
                                            this.setState({
                                                password: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary btn-block" style={{marginTop: "10px"}}
                                    onClick={e => {
                                         this.login();
                                        e.preventDefault();
                                    }}
                                >
                                    Prisijungti
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className="mt-5 mb-3 text-muted text-center">Kaunas 2018</p>
                </header>
        );
    }
}

export default Login;
