import React from 'react';
import List from '../common/List';

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
                                // Filter out yourself
                                return (el.Hash !== this.props.user.Hash) ? <option key={i} value={el.Hash}>{el.Name}</option> : null
                            })}
                        </select>
                    </form>
                </div>
                <div className="slider-buttons">
                    <button className="btn btn-secondary middle" onClick={this.props.handleDownClick}>&darr; Ratings received</button>
                </div>
                <List {...this.props.currentAgent}/>
            </div>
        )
    }
}

export default MySlider;
