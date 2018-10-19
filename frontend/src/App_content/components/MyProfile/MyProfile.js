import React, { Component } from 'react';
import { GO_TO_USER } from '../../ducks/ui';
import Star from '../common/Star';
import Modal from '../common/Modal';
import List from '../common/List';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

const Header = withRouter(({ history, ...props }) => (
    <header className="App-header">
        <button className="btn btn-secondary right" onClick={() => { props.handelGoToUser(); history.push('/User') }}>Search users &rarr;</button>
    </header>
));

class MyProfile extends Component {
    componentDidMount() {
    }

    render() {
        // First we have to check if user is already loaded from server
        if(!this.props.user.name)
            return (<Redirect to='/' />)

        return (
            <div className="App col-lg-5 m-auto">
                <Modal {...this.props}/>
                <Header {...this.props}/>
                <Star {...this.props}/>
                <List {...this.props.currentAgent}/>
            </div>
        );
    }
}

// Mapping of Redux state to Component's props
const mapStateToProps = ( state ) => {
    return {
        currentAgent: state.data.currentAgent,
        user: state.data.user
    }
};

// Functions dispatching Redux actions for later consumption by middleware and reducers
// Those functions are passed to Component as props with help of connect() below
const mapDispatchToProps = ( dispatch ) => {
    return {
        handelGoToUser: (Hash) => {
            dispatch({
                type: GO_TO_USER
            });
        }
    }
}

// Actual maping of Redux components to React props for "Main" component
export default connect (
    mapStateToProps, 
    mapDispatchToProps
)(MyProfile);
