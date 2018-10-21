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
        <button className="btn btn-secondary right" onClick={() => { props.handelRate(props.sliderValues) }}>&#x2713; Save</button>
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
            sliderValues: this.getSliderValues(props)
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ sliderValues: this.getSliderValues(nextProps) });
    }

    handleSliderChange(val, cat) {
        this.calculateOverallRating();
        this.setState({
            sliderValues: { ...this.state.sliderValues, ...{[cat]: val}}
        });
    }

    calculateOverallRating() {
        let i = 0, sum = 0;
        // Calculate all sliders
        Object.keys(this.state.sliderValues).map(k => {
            if (this.state.sliderValues[k] !== null) {
                sum += this.state.sliderValues[k];
                i++;
            }
            return k;
        });
        // Add to it existing ratings
        Object.keys(this.state.currentAgent.categoryRatings).map(k => {
            if (this.state.currentAgent.categoryRatings[k] !== null) {
                sum += this.state.currentAgent.categoryRatings[k];
                i++;
            }
            return k;
        });
        
        let av = parseInt(10 * sum / i)/10;

        this.setState(({currentAgent}) => ({currentAgent: {
            ...currentAgent, 
            overallRating: av
        }}));
    }

    getSliderValues(props) {
        return Object.keys(props.currentAgent.categoryRatings).reduce((obj, k) => {
            return (
                props.currentAgent.categoryRatings[k] === null) 
                    ? {...obj, [k]: props.currentAgent.categoryRatings[k]} 
                    : obj
        }, {})
    }

    Sliders() {
        if (!this.state.sliderValues) return;
        return (
            Object.keys(this.state.sliderValues).map((k, i) => {
                let style = {width: (100 - this.state.sliderValues[k] / 9 * 100).toString() + '%'};
                return (
                    <div key={i} className="cat-wrapper">
                        <div className="cat-name">{k}</div>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={style}></div>
                            <div className="cat-value">{this.state.sliderValues[k]}</div>
                            <Slider 
                                min={0} 
                                max={9} 
                                step={0.1} 
                                defaultValue={5} 
                                handle={MyHandle} 
                                onChange={
                                    e => {this.handleSliderChange(e, k)}} 
                                onAfterChange={
                                    e => {this.calculateOverallRating()}} 
                                className="cat-slider" 
                            />
                        </div>
                    </div>
                );
            })
        );
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
                    {this.Sliders()}
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
