import React, {Component} from 'react';
import './App.scss';
import Header from "./containers/Header/Header";
import {userActions} from "./store/actions";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./containers/Home/Home";
import Featured from "./containers/Featured/Featured";
import Blogs from "./containers/Blogs/Blogs";
import Bloggers from "./containers/Bloggers/Bloggers";
import CreateBlogs from "./containers/CreateBlogs/CreateBlogs";
import UserBlogs from "./containers/UserBlogs/UserBlogs";
import PrivateRoute from "./_helpers/PrivateRoute";

class App extends Component {

    componentDidMount() {
        if (localStorage.getItem('bitNormToken') === '1') {
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
                    <Route exact path="/" component={Home}/>
                    <Route path="/featured" component={Featured}/>
                    <Route path="/blogs" component={Blogs}/>
                    <Route path="/bloggers" component={Bloggers}/>
                    <PrivateRoute path="/create-blog" component={CreateBlogs}/>
                    <PrivateRoute path="/user-blogs" component={UserBlogs}/>
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

