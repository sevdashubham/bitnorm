import React, {Component} from 'react';
import {connect} from "react-redux";
import {userActions} from "../../store/actions";

class userBlogs extends Component {

    render() {
        return (
            <div>
                <h1> Your Blogs </h1>
            </div>
        )
    }
}

const styles= {
    headerContainer: {
        background: '#DEDEDE',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0 40px',
        justifyContent: 'space-between'
    },
    headerAnchorContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0 10px'
    },
    headerAnchorItems: {
        padding: '0 20px'
    },

    blogContainer: {
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',
        padding:'0 10px'

    },
    headerRightAnchors: {
        padding: '0 10px'
    },
    avatar: {
        margin: '0 10px',
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        background: 'grey',
        height: 30,
        width: 30,
        borderRadius: 15
    }

};

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
)(userBlogs);
