const table = document.querySelector('#desk');

let positions = [];
let turn = false;
let playing = {
    'col': 0,
    'row': 0,
    'class': ''
};


for (let key = 1; key <= 8; key++) {
    if (key == 1) {
        for (let index = 1; index <= 8; index++) {
            let position = {
                'collumn': index,
                'row': key,
                'class': 'active'
            };
            positions.push(position);
        }
    } else if (key == 2) {
        for (let index = 1; index <= 8; index++) {
            let position = {
                'collumn': index,
                'row': key,
                'class': 'active'
            };
            positions.push(position);
        }
    } else if (key == 7) {
        for (let index = 1; index <= 8; index++) {
            let position = {
                'collumn': index,
                'row': key,
                'class': 'active'
            };
            positions.push(position);
        }
    } else if (key == 8) {
        for (let index = 1; index <= 8; index++) {
            let position = {
                'collumn': index,
                'row': key,
                'class': 'active'
            };
            positions.push(position);
        }
    } else {
        for (let index = 1; index <= 8; index++) {
            let position = {
                'collumn': index,
                'row': key,
                'class': 'inactive'
            };
            positions.push(position);
        }
    }
}


positions.forEach(item => {
    const player = document.createElement('div');

    player.style.gridColumn = item.collumn;
    player.style.gridRow = item.row;
    player.classList.add(item.class);

    const moveStart = (col, row, pos) => {
        playing.col = col;
        playing.row = row;
        playing.class = pos;
    };
    
    const moveEnd = () => {
        const col = playing.col;
        const row = playing.row;
        const pos = playing.class;
        turn = false;
        return {
            col: col,
            row: row,
            pos: pos
        }
    };

    if (turn === false && item.class === 'inactive') {
        player.addEventListener('click', ( ) => {
            const {col, row, pos} = moveEnd();
            player.classList.replace(item.class, pos);
            console.log(col, row, pos);
        });
    }

    if (turn === false && item.class === 'active') {
        player.addEventListener('click', () => {
            turn = false;
            moveStart(item.collumn, item.row, item.class);
            console.log(turn);
        });
    }
    table.append(player);
});