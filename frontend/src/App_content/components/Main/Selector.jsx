import React from 'react';


class MySlider extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit("Johny");
    }

    render() {
        return(
            <div>
                <div>
                    <div>Select user to rate</div>
                    <form class="form-group" onSubmit={this.handleSubmit}>
                        <select class="form-control" id="userForm">
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