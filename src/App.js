import React, {useEffect, useState} from 'react';
import Field from "./components/Field/Field";
import {MINES_COUNT, SIZE} from "./constants";
import Timer from "./components/Timer/Timer";
import "./App.css"
import SmileFace from "./components/SmileFace/SmileFace";
import {Face, Mask} from "./types";
import {createField} from "./utils/createField";
import {useWin} from "./hooks/useWin";

const App = () => {

    const [flagsAmount, setFlagsAmount] = useState(MINES_COUNT)
    const [face, setFace] = useState(Face.Smile);
    const [timeCount, setTimeCount] = useState(0);
    const [isGenerate, setIsGenerate] = useState(false);
    const [loose, setLoose] = useState(false);
    const [field, setField] = useState(() => (createField(SIZE, MINES_COUNT)))
    const [mask, setMask] = useState(() => new Array(SIZE * SIZE).fill(Mask.Fill))

    const win = useWin(field, mask, setMask, setFace);

    const gameReset = () => {
        setIsGenerate(false);
        setFlagsAmount(MINES_COUNT);
        setField(() => (createField(SIZE, MINES_COUNT)))
        setMask(() => new Array(SIZE * SIZE).fill(Mask.Fill))
        setLoose(false);
        setTimeCount(0);
        setFace(Face.Smile)
    }


    useEffect(() => {
        if (timeCount !== 999 && isGenerate && !loose && !win) {
            const timer = setInterval(() => {
                setTimeCount(timeCount + 1);
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [timeCount, isGenerate, loose, win]);


    return (
        <div className="App">
            <div className="header">
                <Timer value={flagsAmount}/>
                <SmileFace onClick={gameReset} value={face}/>
                <Timer value={timeCount}/>
            </div>
            <Field flagsAmount={flagsAmount}
                   setFlagsAmount={setFlagsAmount}
                   isGenerate={isGenerate}
                   setIsGenerate={setIsGenerate}
                   loose={loose}
                   setLoose={setLoose}
                   mask={mask}
                   setMask={setMask}
                   field={field}
                   setField={setField}
                   win={win}
                   setFace={setFace}
            />
        </div>
    );
};

export default App;