import React from 'react';

class Star extends React.Component {

    render() {
        return (
            <div className="star-outer">
                <div className="star-wrapper">
                    <div className="star-rating">{this.props.currentAgent.average}</div>
                    <svg className="svg-star" viewBox="0 0 200 200">
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" stopColor="#f88968" stopOpacity="1" />
                                <stop offset="64%" stopColor="#ffcf4f" stopOpacity="1" />
                                <stop offset="84%" stopColor="#ffdf7f" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                        <g>
                            <path fill="url(#grad1)" d=" M 161.076 194.356 L 99.55 162.01 L 38.025 194.356 L 49.775 125.846 L 0 77.327 L 68.788 67.332 L 99.55 5 L 130.313 67.332 L 199.1 77.327 L 149.325 125.846 L 161.076 194.356 Z "/>
                        </g>
                    </svg>
                </div>
                <div className="titles">{this.props.currentAgent.name}</div>
            </div>
        );
    }
}

export default Star;