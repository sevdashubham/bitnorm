import React, {Component} from 'react';
import './Header.css';

class Header extends Component {

    state={
      headerList:['Featured', 'Blogs', 'Bloggers', 'Search']
    };

    componentDidMount() {

    }

    render() {
        const {headerList} = this.state;

        const headerAnchor = headerList.map((item, index) => {
           return (
               <div style={styles.headerAnchorItems}>
                   <div className="link">
                       <div style={{marginBottom: 10}}>{item}</div></div>
               </div>
           )
        });

        return (
            <div style={styles.headerContainer}>
                <div style={{display: 'flex', flexDirection: 'row',  alignItems: 'center',}}>
                    <span>
                        LOGO
                    </span>
                    <div style={styles.headerAnchorContainer}>
                        {headerAnchor}
                    </div>
                </div>
                <div style={styles.blogContainer}>
                    <div style={styles.headerRightAnchors}>
                        <div className="link">
                            <div style={{marginBottom: 10}}>Create a Blog</div>
                        </div>
                    </div>
                    <div style={styles.headerRightAnchors}>
                        <div className="link">
                            <div style={{marginBottom: 10}}>Your Blogs</div>
                        </div>
                    </div>
                   <div style={styles.avatar}/>

                </div>
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


export default Header;