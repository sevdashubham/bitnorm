import React, {Component} from 'react';
import './App.css';
import Header from "./containers/Header/Header";
import {userActions} from "./store/actions";
import {connect} from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./containers/Home/Home";
import Featured from "./containers/Featured/Featured";

class App extends Component {

    componentDidMount() {
        if (localStorage.getItem('authenticated') === '1') {
            this.props.isAuthenticated(true);
        } else {
            this.props.isAuthenticated(false);
        }
    }

    render() {
        return (
            <div className="App">
                <Router>
                <Header/>
                    <Route exact path="/" component={Home} />
                    <Route path="/featured" component={Featured} />
                    {/*<Route path="/topics" component={Topics} />*/}
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {authenticated} = state.user;
    return {
        authenticated
    };
};

const mapDispatchToProps = dispatch => ({
    isAuthenticated: (boolean) => dispatch(userActions.isAuthenticated(boolean)),
});



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

