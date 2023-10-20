import React from "react";

const Card = (props) => {
    return (
        <div className="card">
            <h2>{props.header}</h2>
            <h3>{props.body}</h3>
        </div>
    )
}
export default Card;