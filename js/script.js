const table = document.querySelector('#desk');

let positions = [];
let turn = false;
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

    if (item.row === 1 || item.row === 2 || item.row === 7 || item.row === 8) {
        player.style.gridColumn = item.collumn;
        player.style.gridRow = item.row;
        player.classList.add('active');
    } else {
        player.style.gridColumn = item.collumn;
        player.style.gridRow = item.row;
        player.classList.add('inactive');
    }

    

    const moveStart = () => {
        player.classList.replace('active', 'inactive');
    };
    
    const moveEnd = () => {
        player.classList.replace('inactive', 'active');
        counter ++;
        console.log(counter);
    };

    player.addEventListener('click', () => {
        for (let cssClass of player.classList) {
            playing.class = cssClass;
            if (playing.class === 'active' && turn === false) {
                console.log('moveStart');
                moveStart();
                turn = true;
            } else if (playing.class === 'inactive' && turn === true ) {
                moveEnd();
                turn = false;
                console.log('moveEnd');
            }
        }
    });
    
    table.append(player);
});