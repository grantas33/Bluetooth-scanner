import React, { Component } from 'react';
import '../../css/app.css';

export class FormError extends Component {
    render() {
        return (
            <div className='row justify-content-end'>
                <div className='col-auto'>
                    <small className="text-error">{this.props.error}</small>
                </div>
            </div>
        );
    }
}