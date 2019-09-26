import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {blogActions} from "../../store/actions/blog.actions";
import {CircularProgress} from "@material-ui/core";

class BlogPage extends Component {

    componentDidMount() {
        const {blogID} = this.props.match.params;
        if (blogID) {
            this.props.getBlogByID(blogID);
        }
    }

    render() {
        const {data, isFetchingBlog} = this.props;

        if(isFetchingBlog) {
            return (
                <div>
                   <CircularProgress/>
                </div>
            )
        }


        if(Object.keys(data).length === 0 && data.constructor === Object ) {
            return (
                <div>
                    No blog found for this ID
                </div>
            )
        }

        return (
            <div>
                <h2>{data.name? data.name: ''}</h2>
                <h5>{data.description? data.description: ''}</h5>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {data, isFetchingBlog} = state.blog;
    return {
        data,
        isFetchingBlog
    };
};

const mapDispatchToProps = dispatch => ({
    getBlogByID: (id) => dispatch(blogActions.getBlogByID(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(BlogPage));
