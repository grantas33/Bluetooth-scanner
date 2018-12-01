import React, { Component } from 'react';
import '../css/app.css';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import {FaLock, FaEnvelope, FaUser} from 'react-icons/fa'
import {FormError} from "./Helpers/FormError";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObject: {
                name: "",
                surname: "",
                email: "",
                password: ""
            },
            errors: {
                name: "",
                surname: "",
                email: "",
                password: ""
            },
            retypedPassword: "",
            redirectToLogin: false
        };
        this.register = this.register.bind(this);
    }

    register() {
        axios
            .post("auth/register", this.state.userObject)
            .then(res => {
                this.setState({
                    redirectToLogin: true
                })
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data.error_message
                });
                window.localStorage.removeItem("userToken");
            });
    }

    render() {
        const redirectToLogin = this.state.redirectToLogin;
        if (redirectToLogin === true) {
            return <Redirect to="/login" />
        }
        return (
            <header className="App-header">
                <form method="post">
                    {this.state.errors.name ? <FormError error={this.state.errors.name}/> : ''}
                    <div className='row'>
                        <div className="col-1">
                            <FaUser/>
                        </div>
                        <div className="col">
                            <div className="form-group has-feedback">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Vardas"
                                    onChange={e =>
                                        this.setState({
                                            ...this.state,
                                            userObject: {
                                                ...this.state.userObject,
                                                name: e.target.value
                                            }
                                        })
                                    }
                                />
                                <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                        </div>
                    </div>

                    {this.state.errors.surname ? <FormError error={this.state.errors.surname}/> : ''}
                    <div className='row'>
                        <div className="col-1">

                        </div>
                        <div className="col">
                            <div className="form-group has-feedback">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Pavardė"
                                    onChange={e =>
                                        this.setState({
                                            ...this.state,
                                            userObject: {
                                                ...this.state.userObject,
                                                surname: e.target.value
                                            }
                                        })
                                    }
                                />
                                <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                        </div>
                    </div>

                    {this.state.errors.email ? <FormError error={this.state.errors.email}/> : ''}
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
                                            ...this.state,
                                            userObject: {
                                                ...this.state.userObject,
                                                email: e.target.value,
                                            }
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {this.state.errors.password ? <FormError error={this.state.errors.password}/> : ''}
                    <div className='row'>
                        <div className="col-1">
                            <FaLock/>
                        </div>
                        <div className="col">
                            <div className={"form-group has-feedback"}>
                                <input
                                    type="password"
                                    className={
                                        "form-control" +
                                        (this.state.retypedPassword ===
                                        this.state.userObject.password
                                            ? ""
                                            : " is-invalid")}
                                    placeholder="Slaptažodis"
                                    onChange={e =>
                                        this.setState({
                                            ...this.state,
                                            userObject: {
                                                ...this.state.userObject,
                                                password: e.target.value
                                            }
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-1">

                        </div>
                        <div className="col">
                            <div
                                className={"form-group has-feedback"}>
                                <input
                                    type="password"
                                    className={
                                        "form-control" +
                                        (this.state.retypedPassword ===
                                        this.state.userObject.password
                                            ? ""
                                            : " is-invalid")}
                                    placeholder="Pakartokite slaptažodį"
                                    onChange={e =>
                                        this.setState({
                                            ...this.state,
                                            retypedPassword: e.target.value
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
                                className="btn btn-primary btn-block btn-flat"
                                onClick={e => {
                                    if (
                                        this.state.retypedPassword ===
                                        this.state.userObject.password
                                    ) {
                                        this.register();
                                    } else {
                                        this.setState(({
                                            errors: {
                                                password: 'Slaptažodžiai nesutampa'
                                            }
                                        }));
                                    }
                                    e.preventDefault();
                                }}
                            >
                                Registruotis
                            </button>
                        </div>
                    </div>
                </form>
                <Link to="/login" className="text-center">
                    Jau esate prisiregistravęs? Prisijunkite
                </Link>
            </header>
        );
    }
}

export default Register;
