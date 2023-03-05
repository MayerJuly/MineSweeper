import React from 'react';
import cl from "./SmileFace.module.css"

const cellOffsetX = -27;

const SmileFace = ({onClick, value}) => {
    const offsetX = value !== 0
        ? (value + 1) * cellOffsetX
        : 0;
    return (
        <div
            onClick={onClick}
            className={cl.smileFace}
            style={{backgroundPositionX: offsetX}}
        />
    );
};

export default SmileFace;