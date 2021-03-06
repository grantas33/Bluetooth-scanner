import React, { Component } from 'react';
import '../css/app.css';
import {Link, Route} from "react-router-dom";

export class Header extends Component {
    render() {
        return (
            <div
                className="container-fluid d-flex justify-content-between align-items-center bg-light"
                style={{'minHeight': '8vh'}}>
                <div className="margin">{this.props.fullName  ? this.props.fullName : ''}</div>
                {this.props.routeUrl ?
                    <div className="margin">
                        <Link to={this.props.routeUrl} className='btn btn-secondary btn-block'>{this.props.routeTitle}</Link>
                </div> :''}
            </div>
        );
    }
}