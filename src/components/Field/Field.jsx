import React from 'react';
import cl from "./Field.module.css";
import FieldCell from "../FieldCell/FieldCell";
import {SIZE} from "../../constants";

const Field = ({
                   flagsAmount,
                   setFlagsAmount,
                   loose,
                   setLoose,
                   isGenerate,
                   setIsGenerate,
                   mask,
                   setMask,
                   field,
                   setField,
                   win,
                   setFace
               }) => {

    const viewField = new Array(SIZE).fill(null)


    return (
        <div className={cl.container}>


            {viewField.map((_, y) => {
                return (<div key={y} className={cl.fieldRow}>
                    {
                        viewField.map((_, x) => {
                            return (<FieldCell key={x}
                                               x={x}
                                               y={y}
                                               isGenerate={isGenerate}
                                               setIsGenerate={setIsGenerate}
                                               mask={mask}
                                               setMask={setMask}
                                               loose={loose}
                                               setLoose={setLoose}
                                               win={win}
                                               field={field}
                                               setField={setField}
                                               setFlagsAmount={setFlagsAmount}
                                               flagsAmount={flagsAmount}
                                               setFace={setFace}
                            />);

                        })}</div>);
            })}

        </div>
    );
};

export default Field;