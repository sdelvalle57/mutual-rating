import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import button from './button.jpg';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

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

ReactDOM.render(<App />, document.getElementById('root'));

// Renders to the "slider" DOM element, just below "root" as in index.HTML
// Makes use of the rc-slider package

const wrapperStyle = { width: 600, margin: 95 };
ReactDOM.render(
  <div>
    <div style={wrapperStyle}>
      <p>Accuracy</p>
      <Slider min={0} max={10} defaultValue={5} handle={handle} />
    </div>
    <div style={wrapperStyle}>
      <p>Reliability</p>
      <Slider min={0} max={10} defaultValue={3} handle={handle} />
    </div>
    <div style={wrapperStyle}>
      <p>Quality</p>
      <Slider min={0} max={10} defaultValue={5} handle={handle} />
    </div>
  </div>,
  document.getElementById('slider')
);

ReactDOM.render(
  <input type="image" id="submitbutton" src={button} />,
  document.getElementById('submit')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
