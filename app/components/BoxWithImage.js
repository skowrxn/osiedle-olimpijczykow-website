import React from "react";
import Image from "next/image";

const BoxWithIcon = ({ imageSrc, title, description }) => (
    <div className="text-left mb-5">
        <Image
            src={imageSrc}
            alt={title}
            width={800}
            height={200}
            style={{ width: "100%", height: "auto", display: "block" }}
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
                height: "145px",
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
