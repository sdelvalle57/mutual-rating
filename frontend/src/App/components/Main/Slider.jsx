import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';

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


const MySlider = () => {
    return (
        <div>
            <div>
                <p>Accuracy</p>
                <Slider min={0} max={10} defaultValue={5} handle={MyHandle} />
            </div>
        </div>
    );
}

export default MySlider;