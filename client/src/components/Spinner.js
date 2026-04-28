import React from "react";

const Spinner = ({ size = 100, theme = "dark", className = "" }) => {
    const isDark = theme === "dark";

    const outerColor = isDark ? "#333" : "#ddd";
    const innerColor = isDark ? "#999" : "#666";
    const hubColor = isDark ? "#444" : "#aaa";
    const spokeColor = isDark ? "#444" : "#bbb";
    const strokeColor = isDark ? "#000" : "#999";

    return (
        <div
            className={`flex items-center justify-center ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            <svg
                className="h-full animate-spin-slow"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width={size}
                height={size}
            >
                {/* Outer tire */}
                <circle cx="50" cy="50" r="48" stroke={strokeColor} strokeWidth="4" fill={outerColor} />

                {/* Inner rim */}
                <circle cx="50" cy="50" r="30" fill={innerColor} stroke={strokeColor} strokeWidth="2" />

                {/* Hub */}
                <circle cx="50" cy="50" r="6" fill={hubColor} />

                {/* Spokes */}
                {[...Array(6)].map((_, i) => {
                    const angle = (i * 60 * Math.PI) / 180;
                    const x = 50 + 24 * Math.cos(angle);
                    const y = 50 + 24 * Math.sin(angle);
                    return (
                        <line
                            key={i}
                            x1="50"
                            y1="50"
                            x2={x}
                            y2={y}
                            stroke={spokeColor}
                            strokeWidth="3"
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default Spinner;
