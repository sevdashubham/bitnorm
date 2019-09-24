import React, {Component} from 'react';
import {connect} from "react-redux";
import {userActions} from "../../store/actions";

class Blogs extends Component {

    render() {
        return (
            <div>
                <h1>Blogs</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {authenticated} = state.user;
    return {
        authenticated
    };
};

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(userActions.login()),
    logout: () => dispatch(userActions.logout()),
});



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blogs);
