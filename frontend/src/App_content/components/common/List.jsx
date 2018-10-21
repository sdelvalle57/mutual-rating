import React from 'react';

const List = (props) => {
    return (
        <div>
            {Object.keys(props.categoryRatings).map((key, i) => {
                let value = props.categoryRatings[key];
                let style = {width: (100 - value / 9 * 100).toString() + '%'};
                // If category value === null then do not print it
                if (value === null) return false;
                return (
                    <div key={i} className="cat-wrapper">
                        <div className="cat-name">{key}</div>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={style}></div>
                            <div className="cat-value">{value}</div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
        
    )
}

export default List;