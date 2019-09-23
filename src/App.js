import React, {Component} from 'react';
import './App.css';
import Header from "./containers/Header/Header";
import {userActions} from "./store/actions";
import {connect} from "react-redux";

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
                <Header/>
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

