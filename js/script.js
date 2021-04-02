const table = document.querySelector('#desk'),
      turnInfo = document.querySelector('.sidebar_header'),
      possition = document.querySelector('.possition');

let positions = [];
let turn = false;
let side = 'black';
let turnInfoColor = 'white';
let canKill = '';
let counter = 0;
let coordinates = [];

for (let key = 1; key <= 8; key++) {
    for (let index = 1; index <= 8; index++) {
        let position = {
            'collumn': index,
            'row': key,
        };
        positions.push(position);
    }
}

class Figure {
    constructor(x, y, figure) {
        this.x = x;
        this.y = y;
        this.class = figure;
    }

    createFigure() {
        const block = document.createElement('div');

        block.style.gridRow = this.x;
        block.style.gridColumn = this.y;
        block.classList.add(this.class);

        const moveStart = (row, collumn, play) => {
            block.classList.replace(play, 'inactive');
            side = play;
            if (side === 'black') {
                turnInfoColor = 'white';
            } else if (side === 'white') {
                turnInfoColor = 'black';
            }
            turn = true;
    
            coordinates.push(row,collumn);
        };

        const moveEnd = () => {
            const list = document.createElement('li');
            const pos = block.style.cssText.split(' ');
            coordinates.push(pos[1], pos[3]);
            turnInfo.textContent = `It's ${turnInfoColor}'s turn`;
    
    
            if (canKill === 'inactive') {
                block.classList.replace('inactive', side);
                list.textContent = `From ${coordinates[0]}, ${coordinates[1]} -> To ${coordinates[2]}, ${coordinates[3]}`;
                list.classList.add(`${side}ish`);
                possition.append(list);
            } else if (side != canKill){
                block.classList.replace(canKill, side);
                list.textContent = `From ${coordinates[0]}, ${coordinates[1]} -> To ${coordinates[2]}, ${coordinates[3]}`;
                list.classList.add(`${side}ishKill`);
                possition.append(list);
            } else if (side == canKill) {
                return ;
            }
    
            coordinates.length = 0;
            turn = false;
        };

        block.addEventListener('click', () => {
            if ((block.classList.value === 'black' || block.classList.value === 'white') && 
                turn === false &&
                block.classList.value !== side ) {
                moveStart(this.x, this.y, block.classList.value);
            } else if (turn === true ) {
                canKill = block.classList.value;
                moveEnd();
            }
        });

        return block;
    }
}

positions.forEach(item => {

    if (item.row === 1 || item.row === 2) {
        let testing = new Figure(item.row,item.collumn,'white');
        table.append(testing.createFigure());
    } else if ( item.row === 7 || item.row === 8) { 
        let testing = new Figure(item.row,item.collumn,'black');
        table.append(testing.createFigure());
    } else {
        let empty = new Figure(item.row,item.collumn,'inactive');
        table.append(empty.createFigure());
    }

});