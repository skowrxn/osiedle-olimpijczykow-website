import React from "react";

const BoxWithIcon = ({ children, title, description }) => (
    <div className="text-left mb-5">
        {children}
        <i
            className={`fi`}
            style={{
                fontSize: "48px",
                display: "block",
                marginBottom: "12px",
                color: "#232323",
            }}
        />
        <h3
            style={{
                fontSize: "20px",
                fontWeight: 600,
                margin: "12px 0 6px 0",
            }}
        >
            {title}
        </h3>
        <p
            style={{
                color: "#888",
                fontSize: "15px",
                margin: 0,
                height: "135px",
            }}
        >
            {description}
        </p>
        <div
            style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#444",
                marginTop: "16px",
            }}
        />
    </div>
);

export default BoxWithIcon;
