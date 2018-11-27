import React, { Component } from 'react';
import './App.css';
import {Route} from "react-router-dom";
import {MainPage} from "./MainPage";
import {Users} from "./Users";

export class Main extends Component {
    render() {
        return (
            <div className="App">
                <Route path="/" exact component={MainPage} />
                <Route path="/users" component={Users} />
                <div className="container-fluid margin d-flex justify-content-center align-items-end" style={{flexGrow: 2}}>
                    <div className="text-center text-muted bg-grey">
                        „Bluetooth“ įrenginių prisijungimų istorijos registravimo sistema, Grantas Gadliauskas
                    </div>
                </div>
            </div>
        );
    }
}
