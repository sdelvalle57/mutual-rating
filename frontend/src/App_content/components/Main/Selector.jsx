import React from 'react';


class MySlider extends React.Component {

    handleChange = (e) => {
        e.preventDefault();
        // Read data from the select input
        this.props.handleOptionChange(e.target.value);
    }

    render() {
        return(
            <div>
                <div>
                    <form className="form-group" onChange={this.handleChange}>
                        <select className="form-control" id="userForm" defaultValue="placeholder">
                            <option value="placeholder" disabled >Select user to rate</option>
                            {this.props.enrolled.map((el, i) => {
                                return <option key={i} value={el.hash}>{el.name}</option>;
                            })}
                        </select>
                    </form>
                </div>
            </div>
        )
    }
}

export default MySlider;
