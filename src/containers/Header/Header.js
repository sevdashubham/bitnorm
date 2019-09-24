import React, {Component} from 'react';
import './Header.scss';
import {connect} from "react-redux";
import {userActions} from "../../store/actions";
import {Link, withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardBackspaceOutlined from '@material-ui/icons/KeyboardBackspaceOutlined';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import CloseOutlined from '@material-ui/icons/CloseOutlined';
import {withStyles} from '@material-ui/styles';

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
                return '';
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
        const {keyword} = this.state;
        if (keyword) {
            this.searchBlogs(keyword);
        }
    }

    searchBlogs(keyword) {
        console.log('search performed for keyword', keyword);
    }

    render() {
        const {headerList, isSearchOpen, keyword} = this.state;
        const {authenticated, classes} = this.props;
        const {pathname} = this.props.location;
        const headerAnchor = headerList.map((item, index) => {
            return (
                <Link to={this.handleLinkClick(item)} key={index}>
                    <div style={styles.headerAnchorItems}
                         onClick={item === 'Search' ? this.handleSearchOpen : this.handleSearchClose}>
                        <div className={`link ${pathname === this.handleLinkClick(item) ? `active` : ''}`}>
                            <div style={styles.bottomMargin10}>{item}</div>
                        </div>
                    </div>
                </Link>
            )
        });

        return (
            <div>
                <div style={styles.headerContainer}>
                    <div style={styles.logoContainer}>
                        <Link to={'/'}><span>
                        LOGO
                    </span></Link>
                        <div style={styles.headerAnchorContainer}>
                            {headerAnchor}
                            {isSearchOpen && <div style={styles.searchContainer}>
                                <form onSubmit={this.handleSubmit}>
                                    <TextField
                                        fullWidth
                                        inputProps={{
                                            style: {padding: 5},
                                        }}
                                        className={classes.textField}
                                        variant="outlined"
                                        id="standard-name"
                                        value={keyword}
                                        onChange={this.onchangeInput}
                                        margin="dense"
                                        placeholder={'Search blogs...'}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <KeyboardBackspaceOutlined style={styles.cursorPointer}
                                                        onClick={() => this.setState({isSearchOpen: false})}/>
                                                </InputAdornment>
                                            ), endAdornment: (
                                                <InputAdornment position="end">
                                                    {keyword &&
                                                    <CloseOutlined style={styles.cursorPointer} onClick={() => this.setState({keyword: ''})}/>}
                                                    <SearchOutlined style={styles.cursorPointer} onClick={this.handleSubmit}/>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </form>
                            </div>}
                        </div>
                    </div>
                    {authenticated ? <div style={styles.blogContainer}>
                        <Link to={'create-blog'}>
                            <div style={styles.headerRightAnchors}>
                                <div className="link">
                                    <div style={styles.bottomMargin10}>Create a Blog</div>
                                </div>
                            </div>
                        </Link>
                        <Link to={'user-blogs'}>
                            <div style={styles.headerRightAnchors}>
                                <div className="link">
                                    <div style={styles.bottomMargin10}>Your Blogs</div>
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
            </div>
        )
    }
}

const styles = {
    searchContainer: {
        width: '100%',
        maxWidth: 600,
        background: '#DEDEDE'
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
        padding: '0 10px',
        width: '100%'
    },
    headerAnchorItems: {
        padding: '0 20px'
    },

    blogContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0 10px',
        flexGrow: 0,
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
    },
    bottomMargin10: {
        marginBottom: 10
    },
    logoContainer: {
        flexGrow: 4,
        display: 'flex', flexDirection: 'row', alignItems: 'center'
    },
    cursorPointer: {
        cursor: 'pointer'
    }
};

const stylesHeader = {
    textField: {
        marginTop: 3,
        fontWeight: 500
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
)(withRouter(withStyles(stylesHeader)(Header)));
