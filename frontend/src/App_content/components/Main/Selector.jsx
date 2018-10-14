import React from 'react';


class MySlider extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        // TODO: read data from the select input
        this.props.handleForwardClick("9ca8ad9763ea8c80ecb6297d94");
    }

    render() {
        return(
            <div>
                <div>
                    <div>Select user to rate</div>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <select className="form-control" id="userForm">
                            <option value="">Suraj</option>
                            <option>Shiv</option>
                            <option>Dan</option>
                            <option>Lee</option>
                            <option>Cameron</option>
                        </select>
                        <button type="submit" className="btn btn-secondary">Select &rarr;</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default MySlider;
