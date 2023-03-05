import React, {useEffect} from 'react';
import {Face, Mask} from "../../types";
import {Mine, MINES_COUNT, SIZE} from "../../constants";
import cl from "./FieldCell.module.css";
import {clearAction} from "../../utils/clearAction";
import {createField} from "../../utils/createField";
import {gameLoose} from "../../utils/gameLoose";

const FieldCell = ({
                       field,
                       setField,
                       isGenerate,
                       setIsGenerate,
                       setMask,
                       loose,
                       setLoose,
                       win,
                       mask,
                       x,
                       y,
                       flagsAmount,
                       setFlagsAmount,
                       setFace,
                   }) => {

    // Handle to Cell's left click

    const handleCellClick = () => {


        if (!isGenerate) {
            let newField = field.slice();
            let isMine = newField[y * SIZE + x] === Mine
            while (isMine) {
                newField = createField(SIZE, MINES_COUNT)
                if (newField[y * SIZE + x] !== Mine) {
                    isMine = false;
                    break;
                }
            }
            setField(newField)
            clearAction(mask, field, x, y, flagsAmount, setFlagsAmount);
            setIsGenerate(true);
        }
        if (win || loose || !isGenerate || mask[y * SIZE + x] === Mask.Flag || mask[y * SIZE + x] === Mask.Question || mask[y * SIZE + x] === Mask.Transparent) return;

        if (mask[y * SIZE + x] === Mask.Transparent) return;

        clearAction(mask, field, x, y, flagsAmount, setFlagsAmount);


        if (field[y * SIZE + x] === Mine) {
            let newField = field.slice();
            gameLoose(newField, x, y, mask);
            setField(newField)
            setMask((prev) => [...prev])
            setLoose(true);
            setFace(Face.Death)

        }


        setMask((prev) => [...prev])


    }
    // Handle to Cell's Right click

    const handleContextMenu = (e) => {

        e.preventDefault();
        e.stopPropagation();

        if (win || loose || !isGenerate) return;


        if (mask[y * SIZE + x] === Mask.Transparent) return;
        if (mask[y * SIZE + x] === Mask.Fill && flagsAmount > 0) {
            mask[y * SIZE + x] = Mask.Flag
            setFlagsAmount(flagsAmount - 1)
        } else if (mask[y * SIZE + x] === Mask.Flag) {
            mask[y * SIZE + x] = Mask.Question
            setFlagsAmount(flagsAmount + 1)
        } else if (mask[y * SIZE + x] === Mask.Question) {
            mask[y * SIZE + x] = Mask.Fill
        }
        setMask((prev) => [...prev])

    }

    // Handle to Cell's Mouse Down
    const handleMouseDown = (e) => {
        if (e.button === 0
            && mask[y * SIZE + x] === Mask.Fill
            && !win && !loose) {
            mask[y * SIZE + x] = Mask.Pressed
            setFace(Face.Fear)
            setMask((prev) => [...prev])

        }
    }
    // Handle to Cell's Mouse Up or Out
    const handleMouseUp = (e) => {
        if (e.button === 0
            && mask[y * SIZE + x] === Mask.Pressed
            && !win && !loose) {
            mask[y * SIZE + x] = Mask.Fill
            setFace(Face.Smile)
            setMask((prev) => [...prev])

        }
    }
    // Transforming Mask states to classes
    useEffect(() => {
        classesArray =
            mask[y * SIZE + x] === Mask.Transparent
                ? [cl.fieldCell, cl[`value-${field[y * SIZE + x]}`]]
                : [cl.fieldCell, cl[`state-${mask[y * SIZE + x]}`]];

    }, [field])
    let classesArray =
        mask[y * SIZE + x] === Mask.Transparent
            ? [cl.fieldCell, cl[`value-${field[y * SIZE + x]}`]]
            : [cl.fieldCell, cl[`state-${mask[y * SIZE + x]}`]];
    return (
        <div key={x} className={classesArray.join(" ")}
             onClick={handleCellClick}
             onContextMenu={handleContextMenu}
             onMouseDown={handleMouseDown}
             onMouseUp={handleMouseUp}
             onMouseOut={handleMouseUp}

        > {


        } </div>
    );
};

export default FieldCell;