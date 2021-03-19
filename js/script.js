const table = document.querySelector('#desk'),
      turnInfo = document.querySelector('.info');

let positions = [];
let turn = false;
let side = 'black';
let turnInfoColor = 'white';
let canKill = '';
let counter = 0;
let playing = {
    'col': 0,
    'row': 0,
    'class': ''
};

for (let key = 1; key <= 8; key++) {
    for (let index = 1; index <= 8; index++) {
        let position = {
            'collumn': index,
            'row': key,
        };
        positions.push(position);
    }
}

positions.forEach(item => {
    const player = document.createElement('div');

    if (item.row === 1 || item.row === 2) {
        player.style.gridColumn = item.collumn;
        player.style.gridRow = item.row;
        player.classList.add('white');
    } else if ( item.row === 7 || item.row === 8) { 
        player.style.gridColumn = item.collumn;
        player.style.gridRow = item.row;
        player.classList.add('black');
    } else {
        player.style.gridColumn = item.collumn;
        player.style.gridRow = item.row;
        player.classList.add('inactive');
    }

    const moveStart = (play) => {
        player.classList.replace( play, 'inactive');
        side = play;
        if (side === 'black') {
            turnInfoColor = 'white';
        } else if (side === 'white') {
            turnInfoColor = 'black';
        }
    };
    
    const moveEnd = () => {
        turnInfo.textContent = `It's ${turnInfoColor}'s turn`;
        console.log(turnInfoColor);
        if (canKill === '') {
            player.classList.replace('inactive', side);
        } else if (side != canKill){
            player.classList.replace(canKill, side);
        } else if (side == canKill) {
            moveEnd();
        }
    };

    player.addEventListener('click', () => {
        for (let cssClass of player.classList) {
            playing.class = cssClass;
            if ((playing.class === 'black' || playing.class === 'white') && 
                turn === false && 
                playing.class !== side ) {
                moveStart(playing.class);
                turn = true;
            } else if (turn === true ) {
                for (let key of player.classList) {
                    canKill = key;
                }
                moveEnd();
                turn = false;
            }
        }
    });
    
    table.append(player);
});