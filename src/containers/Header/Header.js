import React, {Component} from 'react';
import './Header.css';
import {connect} from "react-redux";
import {userActions} from "../../store/actions";
import {Link, withRouter} from 'react-router-dom';

class Header extends Component {

    state = {
        headerList: ['Featured', 'Blogs', 'Bloggers', 'Search']
    };

    handleLogout = this.handleLogout.bind(this);
    handleLinkClick = this.handleLinkClick.bind(this);
    handleCreateBlog = this.handleCreateBlog.bind(this);
    handleLoginRoute = this.handleLoginRoute.bind(this);
    handleSignupRoute = this.handleSignupRoute.bind(this);


    componentDidMount() {

    }

    handleLogout() {
        this.props.logout();
    }

    handleLinkClick(name) {
        switch (name) {
            case 'Featured':
                return '/featured';
            case 'Blogs':
                return '/blogs';
            case 'Bloggers':
                return '/bloggers';
            default:
                return;

        }
    }

    handleLoginRoute() {
        this.props.history.push('/login');
        this.props.login();
    }

    handleSignupRoute() {
        this.props.history.push('/register')
    }

    handleCreateBlog() {
        this.props.history.push('/create-blog')
    }

    render() {
        const {headerList} = this.state;
        const {authenticated} = this.props;
        const {pathname} = this.props.location;
        const headerAnchor = headerList.map((item, index) => {
            return (
                <Link to={this.handleLinkClick(item)}>
                    <div style={styles.headerAnchorItems}>
                        <div className={`link ${pathname === this.handleLinkClick(item) ? `active` : ''}`}>
                            <div style={{marginBottom: 10}}>{item}</div>
                        </div>
                    </div>
                </Link>
            )
        });

        return (
            <div style={styles.headerContainer}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
                    <Link to={'/'}><span>
                        LOGO
                    </span></Link>
                    <div style={styles.headerAnchorContainer}>
                        {headerAnchor}
                    </div>
                </div>
                {authenticated ? <div style={styles.blogContainer}>
                    <Link to={'create-blog'}>
                    <div style={styles.headerRightAnchors}>
                        <div className="link">
                            <div style={{marginBottom: 10}}>Create a Blog</div>
                        </div>
                    </div>
                    </Link>
                    <Link to={'user-blogs'}>
                    <div style={styles.headerRightAnchors}>
                        <div className="link">
                            <div style={{marginBottom: 10}}>Your Blogs</div>
                        </div>
                    </div>
                    </Link>
                    <div onClick={this.handleLogout} style={styles.avatar}/>
                </div> : <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div onClick={this.handleLoginRoute} style={styles.authenticationRoutes}>
                        Login
                    </div>
                    <div onClick={this.handleSignupRoute} style={styles.authenticationRoutes}>sign up</div>
                </div>}
            </div>
        )
    }
}

const styles = {
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0 10px'

    },
    headerRightAnchors: {
        padding: '0 10px'
    },
    avatar: {
        margin: '0 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'grey',
        height: 30,
        width: 30,
        borderRadius: 15
    },
    authenticationRoutes: {
        cursor: 'pointer',
        padding: '0 10px'
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
)(withRouter(Header));