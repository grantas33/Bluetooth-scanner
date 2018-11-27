import React, { Component } from 'react';
import './App.css';
import {Link} from "react-router-dom";

export class Login extends Component {
    render() {
        return (
                <header className="App-header">
                    <form className="form-signin">
                        <h1 className="h3 mb-3 font-weight-normal text-center">Prisijunkite</h1>
                        <input type="email" className="form-control"
                               placeholder="E. paštas" required=""/>
                        <input type="password" className="form-control"
                               placeholder="Slaptažodis" required=""/>
                        <Link to="" className="btn btn-lg btn-primary btn-block" type="submit" style={{marginTop: "10px"}}>
                            Prisijungti
                        </Link>
                        <p className="mt-5 mb-3 text-muted text-center">Kaunas 2018</p>
                    </form>
                </header>
        );
    }
}
