import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {blogActions} from "../../store/actions/blog.actions";
import {CircularProgress} from "@material-ui/core";
import ReactQuill from 'react-quill';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class EditBlog extends Component {

    state = {
        description: '',
        title: '',
        currencyType: '',
        currencies: [
            {label: 'Bitcoin (BTC)', value: 'BTC'},
            {label: 'Ethereum (ETH)', value: 'ETH'},
            {label: 'Ripple (XRP)', value: 'XRP'},
            {label: 'Litecoin (LTC)', value: 'LTC'},
            {label: 'Bitcoin Cash (BCH)', value: 'BCH'},
        ]
    };

    handleChangeDescription = this.handleChangeDescription.bind(this);
    handleChangeTitle = this.handleChangeTitle.bind(this);
    handleChangeCurrencyType = this.handleChangeCurrencyType.bind(this);
    updateBlog = this.updateBlog.bind(this);

    componentDidMount() {
        const {blogID} = this.props.match.params;
        if (blogID) {
            this.props.getBlogByID(blogID);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data.description !== this.props.data.description) {
            this.setState({description: this.props.data.description})
        }
        if (prevProps.data.title !== this.props.data.title) {
            this.setState({title: this.props.data.title})
        }
        if (prevProps.data.currencyType !== this.props.data.currencyType) {
            this.setState({currencyType: this.props.data.currencyType})
        }
    }

    updateBlog() {
        const {title, description, currencyType} = this.state;
        console.log('updating', description, title, currencyType);
        this.props.updateBlog({title, description, currencyType});
    }

    handleChangeDescription(html) {
        console.log(html);
        this.setState({description: html});
    }

    handleChangeTitle(e) {
        this.setState({title: e.target.value});
    }

 handleChangeCurrencyType(e) {
        this.setState({currencyType: e.target.value});
    }

    render() {
        const {data, isFetchingBlog, successMessageBlog} = this.props;
        const {description, title, currencies, currencyType} = this.state;
        console.log(description, title, currencyType);

        if (isFetchingBlog) {
            return (
                <div>
                    <CircularProgress/>
                </div>
            )
        }


        if (Object.keys(data).length === 0 && data.constructor === Object) {
            return (
                <div>
                    No blog found for this ID
                </div>
            )
        }

        return (
            <div>
            <Grid container justify={'flex-start'} alignItems={'center'} direction={'column'} spacing={4}>
                <Grid item xs={12}>
                <TextField
                    id="outlined-name"
                    label="Title"
                    value={title}
                    onChange={this.handleChangeTitle}
                    margin="normal"
                    variant="outlined"
                />
                </Grid>
                <Grid item xs={12}>
                <InputLabel htmlFor="select-multiple">Blog's Category</InputLabel>
                <Select
                    value={currencyType}
                    onChange={this.handleChangeCurrencyType}
                >
                    {currencies.map(currency => (
                        <MenuItem key={currency.value} value={currency.value}>
                            {currency.label}
                        </MenuItem>
                    ))}
                </Select>
                </Grid>
                <Grid item xs={12}>
                <ReactQuill value={description}
                            onChange={this.handleChangeDescription}/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={this.updateBlog}>
                        {successMessageBlog? 'Updated' : 'Update'}
                    </Button>
                </Grid>
                {successMessageBlog && <Grid item xs={12}>
                    {successMessageBlog}
                </Grid>}
            </Grid>
        </div>
        )
    }
}

const mapStateToProps = state => {
    const {data, isFetchingBlog, successMessageBlog} = state.blog;
    return {
        data,
        isFetchingBlog,
        successMessageBlog
    };
};

const mapDispatchToProps = dispatch => ({
    getBlogByID: (id) => dispatch(blogActions.getBlogByID(id)),
    updateBlog: (values) => dispatch(blogActions.updateBlog(values))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(EditBlog));
