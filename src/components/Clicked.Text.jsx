import React from "react";

const ClickedText = ({text}) => {
    return (
        <div className="text-sm">
            <a
                href="#"
                className="font-instrument font-medium text-${props.color} hover:text-${props.hoverColor}"
            >
                {Text}
            </a>
        </div>
    );
};

export default ClickedText;
