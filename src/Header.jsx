import React, { Component } from 'react';
import './App.css';
import {Link, Route} from "react-router-dom";

export class Header extends Component {
    render() {
        return (
            <div
                className="container-fluid d-flex justify-content-between align-items-center bg-light">
                <div className="margin">Grantas Gadliauskas</div>
                <div className="margin">
                    <Link to={this.props.routeUrl}
                          className='btn btn-secondary btn-block'>{this.props.routeTitle}</Link>
                </div>
            </div>
        );
    }
}