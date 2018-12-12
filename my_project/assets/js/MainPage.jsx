import React, { Component } from 'react';
import '../css/app.css';
import {Redirect} from "react-router-dom";
import graphTimeData from './graphTimeData.json'
import filterData from './filterData.json'
import Graph from "./Graph";
import Select from 'react-select'
import {Header} from "./Header";
import axios from "axios";
import tokenObject from "./Helpers/tokenObject.js";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObject: {},
            latestLogs: [],
            graphData: [],
            redirectToLogin: false
        };
        this.getLatestLogs = this.getLatestLogs.bind(this);
        this.getGraphDataPoints = this.getGraphDataPoints.bind(this);
        this.getFirstGraphDataPoints = this.getFirstGraphDataPoints.bind(this);
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

        this.getFirstGraphDataPoints();
        // this.getLatestLogs();
        this.interval = setInterval(() => {
            this.getLatestLogs();
        }, 10000);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getGraphDataPoints() {
        var d = new Date();
        var nextPointDate = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

        this.setState(prevState => ({
            graphData: [...prevState.graphData.slice(-9), {
                "x": nextPointDate,
                "y": this.state.latestLogs.length
            }]
        }));
    }

    getFirstGraphDataPoints() {
        axios
            .get("/api/logs/firstGraphData", tokenObject())
            .then(res => {
                console.log(res);
                this.setState({
                    graphData: res.data[0]
                });
            })
    }

    getLatestLogs() {
        axios
            .get("api/logs/latest", tokenObject())
            .then(res => {
                this.setState({
                    latestLogs: res.data[0]
                });
                this.getGraphDataPoints();
            })
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
                    {this.state.graphData !== [] ? <Graph data={this.state.graphData}/> : ''}
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
                        {this.state.latestLogs.map((log, i) => {
                            return <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{log.name}</td>
                                <td>{log.device.address}</td>
                                <td>{log.device.type}</td>
                            </tr>
                        })}
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