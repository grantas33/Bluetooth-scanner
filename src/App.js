import React, { Component } from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import {Main} from './Main'
import {Login} from "./Login";

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route path="/" exact component={Main}/>
                <Route path="/users" component={Main} />
                <Route path="/login" component={Login} />
            </div>
        </Router>
    );
  }
}

export default App;
