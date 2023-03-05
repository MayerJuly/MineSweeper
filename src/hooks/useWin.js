import {useEffect, useMemo} from "react";
import {Mine} from "../constants";
import {Face, Mask} from "../types";


export const useWin = (field, mask, setMask, setFace) => {
    const win = useMemo(() =>
            field.every((cell, i) =>
                cell === Mine
                || mask[i] === Mask.Transparent)
        , [field, mask])

    useEffect(() => {
        if (win) {
            field.forEach((cell, i) => {
                if (cell !== Mine && mask[i] !== Mask.Transparent) {
                    mask[i] = Mask.Transparent;
                }
                setFace(Face.Win)
                setMask((prev) => [...prev])

            })
        }
    }, [win]);
    return win;
}
