import React, {useEffect, useState} from 'react';
import cl from "./Timer.module.css"

const Timer = ({value}) => {
    const [timeValue, setTimeValue] = useState([]);

    const cellOffsetX = -14;
    const noneOffset = -126;

    useEffect(() => {
        const arrayValue = Array.from(value.toString().padStart(3, "0"), Number);
        setTimeValue(arrayValue);
    }, [value]);

    return (
        <div className={cl.timerWrapper}>
            {timeValue.map((number, index) => {
                const numberOffset = number !== 0 && number
                    ? (number - 1) * cellOffsetX
                    : noneOffset;

                return (
                    <div
                        key={index}
                        className={cl.number}
                        style={{ backgroundPositionX: numberOffset }}
                    />
                );
            })}
        </div>
    );
};

export default Timer;