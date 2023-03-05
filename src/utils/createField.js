import {Mine} from "../constants";

export const createField = (size, mines) => {
    const field = new Array(size * size).fill(0);

    function incrementAround(x, y) {
        if (x >= 0 && x < size && y >= 0 && y < size) {
            if (field[y * size + x] === Mine) return;

            field[y * size + x] += 1;
        }
    }
        for (let i = 0; i < mines;) {
            const x = Math.floor(Math.random() * size)
            const y = Math.floor(Math.random() * size)

            if (field[y * size + x] !== Mine) {
                field[y * size + x] = Mine;
                i += 1;
                incrementAround(x + 1, y);
                incrementAround(x - 1, y);
                incrementAround(x, y + 1);
                incrementAround(x, y - 1);
                incrementAround(x + 1, y - 1);
                incrementAround(x - 1, y - 1);
                incrementAround(x + 1, y + 1);
                incrementAround(x - 1, y + 1);
            }

        }



    return field;
}
