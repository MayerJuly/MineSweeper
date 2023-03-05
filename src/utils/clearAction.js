import {SIZE} from "../constants";
import {Mask} from "../types";

export const clearAction = (mask, field, x, y) => {

    const clearing = [];

    function clear(x, y) {
        if (x >= 0 && x < SIZE && y >= 0 && y < SIZE) {
            if (mask[y * SIZE + x] === Mask.Transparent) return;
            clearing.push([x, y])
        }

    }

    clear(x, y);

    while (clearing.length) {
        const [x, y] = clearing.pop();
        mask[y * SIZE + x] = Mask.Transparent

        if (field[y * SIZE + x] === 0) {
            clear(x + 1, y);
            clear(x - 1, y);
            clear(x, y + 1);
            clear(x, y - 1);
        }


    }

}
