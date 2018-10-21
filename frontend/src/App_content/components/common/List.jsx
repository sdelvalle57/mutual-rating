import React from 'react';

const List = (props) => {
    return (
        <div>
            {props.categoryRatings.map((e, i) => {
                let style = {width: (100 - e.categoryValue / 9 * 100).toString() + '%'};
                // If category value === null then do not print it
                if (e.categoryValue === null) return false;
                return (
                    <div key={i} className="cat-wrapper">
                        <div className="cat-name">{e.categoryName}</div>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={style}></div>
                            <div className="cat-value">{e.categoryValue}</div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
        
    )
}

export default List;