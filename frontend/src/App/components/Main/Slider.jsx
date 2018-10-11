import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
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
            <div style={{ width: 600, margin: 95 }}>
                <p>Accuracy</p>
                <Slider min={0} max={10} defaultValue={5} handle={handle} />
            </div>
        </div>
    );
}

export default MySlider;