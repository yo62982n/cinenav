import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class home extends Component {
    render() {
        return (
            <div>
                <Redirect to="/login"></Redirect>
            </div>
        )
    }
}
