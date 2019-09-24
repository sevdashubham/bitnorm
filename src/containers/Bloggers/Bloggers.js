import React, {Component} from 'react';
import {connect} from "react-redux";
import {userActions} from "../../store/actions";

class Bloggers extends Component {

    render() {
        return (
            <div>
                <h1>Bloggers</h1>
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
)(Bloggers);
