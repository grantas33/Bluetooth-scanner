import React, { Component } from 'react';
import '../css/app.css';
import {Route, Redirect} from "react-router-dom";
import MainPage from "./MainPage";
import Users from "./Users";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="App">
                <Route path="/main" exact component={MainPage} />
                <Route path="/users" component={Users}/>
                <div className="container-fluid margin d-flex justify-content-center align-items-end" style={{flexGrow: 2}}>
                    <div className="text-center text-muted bg-grey">
                        „Bluetooth“ įrenginių prisijungimų istorijos registravimo sistema, Grantas Gadliauskas
                    </div>
                </div>
            </div>
        );
    }
}

export default Main
