import React, { Component } from 'react';
import '../css/app.css';
import {Header} from "./Header";
import {Redirect} from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import tokenObject from "./Helpers/tokenObject";
import axios from "axios";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObject: {
                role: 'ROLE_ADMIN'
            },
            users: null,
            redirectToLogin: false,
        };
        this.getUsers = this.getUsers.bind(this);
    }

    componentDidMount() {
        axios
            .get("api/user/current", tokenObject())
            .then(res => {
                this.setState({
                    userObject: res.data
                })
            })
            .catch(err => {
                this.setState({
                    redirectToLogin: true
                });
            });
        this.getUsers();
    }

    getUsers() {
        axios
            .get("api/user/all", tokenObject())
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
    }

    render() {
        const redirectToLogin = this.state.redirectToLogin;
        if (redirectToLogin === true || this.state.userObject.role !== 'ROLE_ADMIN') {
            return <Redirect to="/login" />
        }
        if (this.state.users === null) {
            return <>
                <Header
                    routeUrl={'/main'}
                    routeTitle={'Grįžti į pagrindinį'}
                    fullName={this.state.userObject.name ? this.state.userObject.name + ' ' + this.state.userObject.surname : ''}
                />
                <h3>Palaukite..</h3>
                </>
        }
        return <>
            <Header
                routeUrl={'/main'}
                routeTitle={'Grįžti į pagrindinį'}
                fullName={this.state.userObject.name ? this.state.userObject.name + ' ' + this.state.userObject.surname : ''}
            />
        <div className="container">
        <table className="table table-sm">
            <thead>
            <tr>
                <th>#</th>
                <th>Vardas</th>
                <th>Pavardė</th>
                <th>Rolė</th>
            </tr>
            </thead>
            <tbody>
            {
                this.state.users.map((user) => {
                    return <tr key={0}>
                        <td key={1}>{user.id}</td>
                        <td key={2}>{user.name}</td>
                        <td key={3}>{user.surname}</td>
                        <td key={4}>{user.role === 'ROLE_ADMIN' ?
                            <span className="badge badge-danger">Administratorius</span> :
                            <span className="badge badge-primary">Vartotojas</span>}</td>
                    </tr>
                })
            }
            </tbody>
        </table>
        </div>
        </>
    }
}

export default Users;