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
            redirectToLogin: false,
        };
    }

    componentDidMount() {
        axios
            .get("api/user/current", tokenObject())
            .then(res => {
                console.log(res);
                this.setState({
                    userObject: res.data
                })
            })
            .catch(err => {
                this.setState({
                    redirectToLogin: true
                });
            });
    }

    render() {
        const redirectToLogin = this.state.redirectToLogin;
        if (redirectToLogin === true || this.state.userObject.role !== 'ROLE_ADMIN') {
            return <Redirect to="/login" />
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
                <th> </th>
                <th> </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td><button className={'btn btn-sm btn-link'}>Pridėti įrenginį</button></td>
                <td><FaTrash/></td>
            </tr>
            <tr>
                <th>2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td><button className={'btn btn-sm btn-link'}>Pridėti įrenginį</button></td>
                <td><FaTrash/></td>
            </tr>
            </tbody>
        </table>
        </div>
        </>
    }
}

export default Users;