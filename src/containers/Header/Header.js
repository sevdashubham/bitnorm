import React, {Component} from 'react';
import './Header.css';
import {connect} from "react-redux";
import {userActions} from "../../store/actions";
import {Link, withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

class Header extends Component {

    state = {
        keyword: '',
        isSearchOpen: false,
        headerList: ['Featured', 'Blogs', 'Bloggers', 'Search']
    };

    handleLogout = this.handleLogout.bind(this);
    handleLinkClick = this.handleLinkClick.bind(this);
    handleCreateBlog = this.handleCreateBlog.bind(this);
    handleLoginRoute = this.handleLoginRoute.bind(this);
    handleSignupRoute = this.handleSignupRoute.bind(this);
    handleSearchOpen = this.handleSearchOpen.bind(this);
    handleSearchClose = this.handleSearchClose.bind(this);
    onchangeInput = this.onchangeInput.bind(this);
    handleSubmit = this.handleSubmit.bind(this);

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

    handleSearchOpen() {
        this.setState({isSearchOpen: true});
    }
    handleSearchClose() {
        this.setState({isSearchOpen: false});
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

    onchangeInput(e) {
        this.setState({keyword: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

    }

    render() {
        const {headerList, isSearchOpen, keyword} = this.state;
        const {authenticated} = this.props;
        const {pathname} = this.props.location;
        const headerAnchor = headerList.map((item, index) => {
            return (
                <Link to={this.handleLinkClick(item)}>
                    <div style={styles.headerAnchorItems} onClick={item === 'Search'? this.handleSearchOpen: this.handleSearchClose}>
                        <div className={`link ${pathname === this.handleLinkClick(item) ? `active` : ''}`}>
                            <div style={{marginBottom: 10}}>{item}</div>
                        </div>
                    </div>
                </Link>
            )
        });

        return (
            <div>
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
                {isSearchOpen && <div style={styles.searchContainer}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            id="standard-name"
                            label="Search"
                            value={keyword}
                            onChange={this.onchangeInput}
                            margin="dense"
                        />
                    </form>
                </div>}
            </div>
        )
    }
}

const styles = {
    searchContainer: {
        background: '#DEDEDE',
        padding: 10
    },
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