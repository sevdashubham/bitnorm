import React, {Component} from 'react';
import {connect} from "react-redux";
import {searchActions, userActions} from "../../store/actions";
import {Link, withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardBackspaceOutlined from '@material-ui/icons/KeyboardBackspaceOutlined';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import CloseOutlined from '@material-ui/icons/CloseOutlined';
import {withStyles} from '@material-ui/styles';

class Navbar extends Component {

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
    searchBlogs = this.searchBlogs.bind(this);

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
        this.props.searchByKeyword(keyword);
    }

    render() {
        const {headerList, isSearchOpen, keyword} = this.state;
        const {authenticated, classes} = this.props;
        const {pathname} = this.props.location;
        const headerAnchor = headerList.map((item, index) => {
            return (
                <Link to={this.handleLinkClick(item)} key={index}>
                    <div className={classes.headerAnchorItems}
                         onClick={item === 'Search' ? this.handleSearchOpen : this.handleSearchClose}>
                        <div className={pathname === this.handleLinkClick(item) ? classes.linkActive : classes.link}>
                            <div className={classes.bottomMargin10}>{item}</div>
                        </div>
                    </div>
                </Link>
            )
        });

        return (
            <div>
                <div className={classes.headerContainer}>
                    <div className={classes.logoContainer}>
                        <Link to={'/'}><span>
                        LOGO
                    </span></Link>
                        <div className={classes.headerAnchorContainer}>
                            {headerAnchor}
                            {isSearchOpen && <div className={classes.searchContainer}>
                                <form onSubmit={this.handleSubmit}>
                                    <TextField
                                        fullWidth
                                        inputProps={{
                                            style:{padding: 5}
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
                                                    <KeyboardBackspaceOutlined className={classes.cursorPointer}
                                                                               onClick={() => this.setState({isSearchOpen: false})}/>
                                                </InputAdornment>
                                            ), endAdornment: (
                                                <InputAdornment position="end">
                                                    {keyword &&
                                                    <CloseOutlined className={classes.cursorPointer}
                                                                   onClick={() => this.setState({keyword: ''})}/>}
                                                    <SearchOutlined className={classes.cursorPointer}
                                                                    onClick={this.handleSubmit}/>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </form>
                            </div>}
                        </div>
                    </div>
                    {authenticated ? <div className={classes.blogContainer}>
                        <Link to={'/create-blog'}>
                            <div className={classes.headerRightAnchors}>
                                <div className={pathname === '/create-blog' ? classes.linkActive : classes.link}>
                                    <div className={classes.bottomMargin10}>Create a Blog</div>
                                </div>
                            </div>
                        </Link>
                        <Link to={'/user-blogs'}>
                            <div className={classes.headerRightAnchors}>
                                <div className={pathname === '/user-blogs' ? classes.linkActive : classes.link}>
                                    <div className={classes.bottomMargin10}>Your Blogs</div>
                                </div>
                            </div>
                        </Link>
                        <div onClick={this.handleLogout} className={classes.avatar}/>
                    </div> : <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div onClick={this.handleLoginRoute} className={classes.authenticationRoutes}>
                            Login
                        </div>
                        <div onClick={this.handleSignupRoute} className={classes.authenticationRoutes}>sign up</div>
                    </div>}
                </div>
            </div>
        )
    }
}

const classesHeader = {
    textField: {
        marginTop: 3,
        fontWeight: 500
    },
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
    },
    link: {
        borderBottom: '3px solid #DEDEDE',
        padding: '10px 0 0 0',
        color: '#000000',
        cursor: 'pointer',
        '&:hover': {
            borderBottom: '3px solid #000000',
        }
    },
    linkActive: {
        borderBottom: '3px solid #000000',
        padding: '10px 0 0 0',
        color: '#000000',
        cursor: 'pointer',
        '&:hover': {
            borderBottom: '3px solid #000000',
        }
    }, inputSearch: {
        padding: '6px 0'
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
    searchByKeyword: (keyword) => dispatch(searchActions.searchByKeyword(keyword))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withStyles(classesHeader)(Navbar)));
