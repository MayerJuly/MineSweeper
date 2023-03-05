import {Mine, SIZE} from "../constants";
import {Mask} from "../types";

export const gameLoose = (field, x, y, mask) => {
    field[y * SIZE + x] = 9; // Bomb pushed
    field.forEach((_, i) => {
        if (field[i] === Mine) {
            if(mask[i] === Mask.Flag)
            {
                field[i] = 10; // Bomb defused
            }
            mask[i] = Mask.Transparent

        }



    })



}