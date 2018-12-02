import React, { Component } from 'react';
import '../css/app.css';
import {Redirect} from "react-router-dom";
import graphData from './graphData.json'
import graphTimeData from './graphTimeData.json'
import filterData from './filterData.json'
import {Graph} from "./Graph";
import Select from 'react-select'
import {Header} from "./Header";
import axios from "axios";
import tokenObject from "./Helpers/tokenObject.js";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObject: {},
            redirectToLogin: false
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
        if (redirectToLogin === true) {
            return <Redirect to="/login" />
        }
        return (<>
                <Header
                    routeUrl={this.state.userObject.role === 'ROLE_ADMIN' ? '/users' : ''}
                    routeTitle={'Vartotojai'}
                    fullName={this.state.userObject.name ? this.state.userObject.name + ' ' + this.state.userObject.surname : ''}
                />
                <div className='container'>
                    <div className="row" style={{"marginTop": "10px"}}>
                        <div className="col-sm-4">
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={graphTimeData[0]}
                                isClearable={false}
                                isSearchable={false}
                                name="graphFilter"
                                options={graphTimeData}
                            />
                        </div>
                    </div>
                </div>
                <div className="container" style={{height: "300px", backgroundColor: "white"}}>
                    <Graph data={graphData}/>
                </div>
                <div className="container">
                    <div className="row" style={{"marginBottom": "10px"}}>
                        <div className="col-sm-4">
                            <Select
                                defaultValue={[]}
                                isMulti
                                name="userFilter"
                                options={filterData}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Filtruoti pagal vartotojus.."
                            />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" placeholder="Filtruoti pagal įrenginio vardą"/>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" placeholder="Filtruoti pagal įrenginio tipą"/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Vardas</th>
                            <th scope="col">Adresas</th>
                            <th scope="col">Tipas</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>OnePlus 3</td>
                            <td>05-D9-22-59-31-A2</td>
                            <td>Phone</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Apple 6</td>
                            <td>AE-05-17-4B-BE-BE</td>
                            <td>Phone</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>KD-5S6F89D</td>
                            <td>5F-73-09-26-85-28</td>
                            <td>TV</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="alert alert-primary">
                                <strong>5</strong> matomi įrenginiai vienu metu!
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="alert alert-warning">
                                <strong>OnePlus 3</strong> praleido <strong>1m 30s</strong>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="alert alert-success">
                                <strong>Phone</strong> išsiskyrė kaip populiariausias tipas
                            </div>
                        </div>
                    </div>
                </div>
        </>
        );
    }
}

export default MainPage