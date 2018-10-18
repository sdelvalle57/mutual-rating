import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import List from './List'

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

const MySlider = (props) => {
    return (
        <div>
            <div>
                <p>What is your rating?</p>
                <Slider min={0} max={9} defaultValue={props.sliderValue} handle={MyHandle} onAfterChange={props.handleSliderChange}/>
            </div>
            <div className="slider-buttons">
              <button className="btn btn-secondary left" onClick={props.handleBackClick}>&larr; Back</button>
              <button className="btn btn-secondary middle" onClick={props.handleDownClick}>&darr; Show previous</button>
              <button className="btn btn-secondary right" onClick={props.handleRateClick}>Rate &rarr;</button>
            </div>
            <List {...props.currentAgent}/>
        </div>
    );
}

export default MySlider;