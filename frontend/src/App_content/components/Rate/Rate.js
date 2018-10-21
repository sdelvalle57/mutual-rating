import React, { Component } from 'react';
import { RATE_AGENT } from '../../ducks/data';
import { GO_TO_RATING } from '../../ducks/ui';
import Star from '../common/Star';
import List from '../common/List';
import Modal from '../common/Modal';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';

const Header = withRouter(({ history, ...props }) => (
    <header className="App-header">
        <button className="btn btn-secondary left" onClick={() => { props.handelGoToRating(); history.push('/User') }}>&larr; Back</button>
        <button className="btn btn-secondary right" onClick={() => { props.handelRate(props.sliderValues) }}>&#x2713; Rate</button>
    </header>
));

const Handle = Slider.Handle;

const MyHandle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

class Rate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAgent: props.currentAgent,
            sliderValues: props.currentAgent.categoryRatings.filter(e => e.categoryValue === null)
        }
    }
    componentDidMount() {
        
    }

    handleSliderChange(e, cat) {
        let arr = this.state.sliderValues.map(el => {
            if (el.categoryName === cat) 
                return {categoryName: cat, categoryValue: e}
            else 
                return el
        });
        this.calculateOverallRating();
        this.setState({sliderValues: arr});
        // console.log(this.state);
    }

    calculateOverallRating() {
        let i = 0, sum = 0;
        // Calculate all sliders
        this.state.sliderValues.map(el => {
            if (el.categoryValue !== null) {
                sum += el.categoryValue;
                i++;
            }
            return el;
        });
        // Add to it existing ratings
        this.state.currentAgent.categoryRatings.map(el => {
            if (el.categoryValue !== null) {
                sum += el.categoryValue;
                i++;
            }
            return el;
        });
        
        let av = parseInt(10 * sum / i)/10;

        this.setState(({currentAgent}) => ({currentAgent: {
            ...currentAgent, 
            overallRating: av
        }}));
    }

    render() {
        // First we have to check if user is already loaded from server
        if(!this.props.user.name)
            return (<Redirect to='/' />)

        return (
            <div className="App col-lg-5 m-auto">
                <Modal {...this.props}/>
                <Header {...this.props} {...this.state}/>
                <Star {...this.state}/>
                <List {...this.props.currentAgent}/>
                <div>
                    {this.state.sliderValues.map((el, i) => {
                        let style = {width: (100 - el.categoryValue / 9 * 100).toString() + '%'};
                        return (
                            <div key={i} className="cat-wrapper">
                                <div className="cat-name">{el.categoryName}</div>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={style}></div>
                                    <div className="cat-value">{el.categoryValue}</div>
                                    <Slider 
                                        min={0} 
                                        max={9} 
                                        step={0.1} 
                                        defaultValue={5} 
                                        handle={MyHandle} 
                                        onChange={
                                            e => {this.handleSliderChange(e, el.categoryName)}} 
                                        onAfterChange={
                                            e => {this.calculateOverallRating()}} 
                                        className="cat-slider" 
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
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
        handelGoToRating: () => {
            dispatch({
                type: GO_TO_RATING
            });
        },
        handelRate: (arr) => {
            dispatch({
                type: RATE_AGENT,
                payload: arr
            });
        }
    }
}

// Actual maping of Redux components to React props for "Main" component
export default connect (
    mapStateToProps, 
    mapDispatchToProps
)(Rate);
