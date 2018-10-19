import React from 'react';
import './List.css';

const List = (props) => {
    return (
        <div>
            {props.categoryRatings.map((e, i) => {
                let style = {width: (100 - e.categoryValue / 9 * 100).toString() + '%'};
                return (
                    <div key={i} className="cat-wrapper">
                        <div className="cat-name">{e.categoryName}</div>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={style}></div>
                            <div className="cat-value">{e.categoryValue}</div>
                        </div>
                    </div>)
                })
            }
        </div>
        
    )
}

export default List;