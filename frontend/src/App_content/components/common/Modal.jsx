import React from 'react';

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

export default Modal;