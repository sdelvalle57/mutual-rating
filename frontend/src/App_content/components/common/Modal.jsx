import React from 'react';
import { connect } from 'react-redux';
import { CHANGE_MODAL } from '../../ducks/ui';

const Modal = (props) => {
    let className = 'modal';

    // Show or not?
    if (props.modal.isShowing)
        className += ' modal-active';

    // Error or not?
    if (props.modal.error)
    className += ' error';

    return (
        <div className={className}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={props.closeModal}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>{props.modal.text}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={props.closeModal}>Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}

// Mapping of Redux state to Component's props
const mapStateToProps = ( state ) => {
    return {
        modal: state.ui.modal
    }
};

// Functions dispatching Redux actions for later consumption by middleware and reducers
// Those functions are passed to Component as props with help of connect() below
const mapDispatchToProps = ( dispatch ) => {
    return {
        closeModal: () => {
            dispatch({type: CHANGE_MODAL, payload: {
                isShowing: false,
                text: ''
            }});
        }
    }
}

// Actual maping of Redux components to React props for "Main" component
export default connect (
    mapStateToProps, 
    mapDispatchToProps
)(Modal);