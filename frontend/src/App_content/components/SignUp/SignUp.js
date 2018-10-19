import React, { Component } from 'react';
import './SignUp.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../../store';
import { INIT_UI } from '../../ducks/ui';

class SignUp extends Component {
    constructor(props){
        super(props);

        this.handleChangeInput=this.handleChangeInput.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = {
            signUpName: '',
            name:'blah',
            namechk:'blah',
            chk:1
        }
    }

    handleChangeInput(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();

        if(this.state.signUpName === this.state.namechk){
            this.setState({chk: 0, name: this.state.signUpName});
            this.handleReset();
        }
        else {
            this.setState({signUpName: 'You are great !!'});
            this.setState({chk: 1});
        }
    }

    handleReset = () => {
        this.setState({
            signUpName: ''
        });
    };

    render(){
        if(this.state.chk){
            return(
                <div className="sign-up-page">

                    <h1 className="sign-up-page-header">Mutual - Rating</h1>

                    <h2 className="sign-up-page-header2">Sign upto continue</h2>

                    <div className="sign-up-page-form">
                        <form className=" has-success">
                            <label className="col-form-label col-form-label-lg" htmlFor="inputSuccess1">Name</label>
                            <input type="text"
                                   onChange={this.handleChangeInput}
                                   value={this.state.signUpName}
                                   className="form-control is-valid"
                                   id="sign-up-page-input"
                                   name="signUpName"
                                   placeholder="Enter your name">
                            </input>
                            <div className="feedback">Only geniuses can give a unique name.</div>
                            <br/>
                            <button type="button" onClick={this.handleSubmit} className="btn btn-primary btn-sm">Check</button>
                        </form>
                    </div>

                </div>
            );

        }
        else {
            return(
                <div className="sign-up-page">

                    <h1 className="sign-up-page-header">Mutual - Rating</h1>

                    <h2 className="sign-up-page-header2">Sign upto continue</h2>

                    <div className="sign-up-page-form">

                        <form className="form-group has-danger">
                            <label className="form-control-label col-form-label col-form-label-lg" htmlFor="inputDanger1">Name</label>
                            <input
                                type="text"
                                onChange={this.handleChangeInput}
                                value={ this.state.signUpName }
                                className="form-control is-invalid form-control-lg sign-up-page-input"
                                id="inputInvalid"
                                name="signUpName"
                                placeholder="Enter your name">
                            </input>
                            <div className="invalid-feedback">Someone with "{this.state.name}" already exists. Try another?</div>
                            <br/>
                            <button type="button" onClick={this.handleSubmit} className="btn btn-primary btn-sm">Check Again</button>
                        </form>
                    </div>

                </div>
            );
        }
    }
    
}


const mapStateToProps = ( state ) => {
    return {
        loading: state.ui.loading,
        currentAgent: state.data.currentAgent
    }
};

// Functions dispatching Redux actions for later consumption by middleware and reducers
// Those functions are passed to Component as props with help of connect() below
const mapDispatchToProps = ( dispatch ) => {
    return {
        method1: () => {

        }
    }
}

// Actual maping of Redux components to React props for "Main" component
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SignUp);
