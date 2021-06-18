import React from 'react';

const errorNotice = (props) => {
    const color = ['alert', 'm-3'];
    color.push(props.noticeColor);

    return (
        <div className={color.join(' ')}>
            <span className="text-muted">{props.message}</span>
            <button onClick={props.clearError} className="btn rounded-pill float-right p-0">X</button>
        </div>
    );
}

export default errorNotice;