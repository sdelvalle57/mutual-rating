import React, { Component } from 'react';
import { CHANGE_OPTION } from '../../ducks/ui';
import { GO_TO_RATING, GO_TO_HOME } from '../../ducks/ui';
import Star from '../common/Star'
import List from '../common/List';
import Selector from '../common/Selector';
import Modal from '../common/Modal';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

const Header = withRouter(({ history, ...props  }) => (
    <header className="App-header">
        <button className="btn btn-secondary left" onClick={() => { props.handelGoToHome(); history.push('/MyProfile') }}>&larr; Back</button>
        <Selector {...props}/>
        <button className="btn btn-secondary right" onClick={() => { 
            props.handelGoToRating();
            if (props.currentAgent && props.currentAgent.hash) 
                history.push('/Rate');
        }}>Rate &rarr;</button>
    </header>
));

class Users extends Component {
    componentDidMount() {
    }

    render() {
        // First we have to check if user is already loaded from server
        if(!this.props.user.name)
            return (<Redirect to='/' />);

        return (
            <div className="App col-lg-5 m-auto">
                <Modal {...this.props}/>
                <Header {...this.props} />
                <Star {...this.props}/>
                <List {...this.props.currentAgent}/>
            </div>
        );
    }
}

// Mapping of Redux state to Component's props
const mapStateToProps = ( state ) => {
    return {
        enrolled: state.data.enrolled,
        currentAgent: state.data.currentAgent,
        user: state.data.user
    }
};

// Functions dispatching Redux actions for later consumption by middleware and reducers
// Those functions are passed to Component as props with help of connect() below
const mapDispatchToProps = ( dispatch ) => {
    return {
        handleOptionChange: (Hash) => {
            dispatch({
                type: CHANGE_OPTION,
                payload: Hash
            });
        },
        handelGoToHome: () => {
            dispatch({
                type: GO_TO_HOME
            });
        },
        handelGoToRating: () => {
            dispatch({
                type: GO_TO_RATING
            });
        }
    }
}

// Actual maping of Redux components to React props for "Main" component
export default connect (
    mapStateToProps, 
    mapDispatchToProps
)(Users);
