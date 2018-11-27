import React, { Component } from 'react';
import '../css/app.css';
import {Header} from "./Header";
import { FaTrash } from "react-icons/fa";

export class Users extends Component {
    render() {
        return <><Header
            routeUrl="/"
            routeTitle="Grįžti į pagrindinį"
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