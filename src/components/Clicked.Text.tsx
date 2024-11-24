import React from "react";

interface ClickedTextProps {
    text: string;
    color?: string;
    hoverColor?: string;
}

const ClickedText: React.FC<ClickedTextProps> = ({
                                                     text,
                                                     color = 'blue-500',
                                                     hoverColor = 'blue-700'
                                                 }) => {
    return (
        <div className="text-sm">
            <a
                href="#"
                className={`font-instrument font-medium text-${color} hover:text-${hoverColor}`}
            >
                {text}
            </a>
        </div>
    );
};

export default ClickedText;