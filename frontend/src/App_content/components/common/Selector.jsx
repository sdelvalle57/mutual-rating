import React from 'react';

class MySlider extends React.Component {

    handleChange = (e) => {
        e.preventDefault();
        // Read data from the select input
        this.props.handleOptionChange(e.target.value);
    }

    render() {
        return(
            <form className="form-group selector" onChange={this.handleChange}>
                <select className="form-control" id="userForm" defaultValue={(this.props.currentAgent.hash !== null) ? this.props.currentAgent.hash : 'placeholder'}>
                    <option value="placeholder" disabled >Select user</option>
                    {this.props.enrolled.map((el, i) => {
                        // Filter out yourself
                        return (el.hash !== this.props.user.hash) ? <option key={i} value={el.hash}>{el.name}</option> : null
                    })}
                </select>
            </form>
        )
    }
}

export default MySlider;
