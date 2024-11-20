document.body.style.backgroundColor = 'black';
document.body.setAttribute('onload','run()');
let headerDiv = document.createElement('div');
let title = document.createElement('h1');
let gameTable = document.createElement('table');
let direction = 2;
// direction: 1 -- Up,
//            2 -- Right
//            3 -- Down
//            4 -- Left
document.body.onkeydown
let snake = [112,111];

for (let i = 0; i < 15; i++) {
    let row = document.createElement('tr');
    for (let j = 1; j < 16; j++) {
        let cell = document.createElement('th');
        let cellid = (i*15+j).toString();
        cell.style.backgroundColor = 'white';
        
        cell.id = cellid;
        cell.style.width = '30px';
        cell.style.height = '30px';
        cell.style.borderRadius = '40%'
        row.appendChild(cell);
    }
    gameTable.appendChild(row);
}

gameTable.style.marginLeft = 'auto';
gameTable.style.marginRight = 'auto';
gameTable.style.backgroundColor = 'white';
title.innerHTML = "Snake";
title.style.textAlign = 'center';
title.style.color = 'green';

headerDiv.appendChild(title);
document.body.appendChild(headerDiv);
document.body.appendChild(gameTable);

function run() {
    function createApple() {
        let loc;
        do {
            loc = Math.floor(Math.random() * 225) + 1
        }while (snake.includes(loc))
        document.getElementById(loc).style.backgroundColor = 'red'
    }
    setInterval(function() {
        moveSnake();
    }, 400); // Yılanı her 400ms'de bir hareket ettir
    document.addEventListener('keydown', function(event) {
        if (event.key === 'w' && direction != 3 || event.key === 'W' && direction != 3) {
            direction = 1; // Yukarı (1)
        } else if (event.key === 'd' && direction != 4 || event.key === 'D' && direction != 4) {
            direction = 2; // Sağ (2)
        } else if (event.key === 's' && direction != 1 || event.key === 'S' && direction != 1) {
            direction = 3; // Aşağı (3)
        } else if (event.key === 'a' && direction != 2|| event.key === 'A' && direction != 2) {
            direction = 4; // Sol (4)
        }
    });
}

function moveSnake() {
    let head = snake[0]; // Yılanın başı
    let newHead;

    if (direction == 1) {
        newHead = head - 15; // Yukarı git
    } else if (direction == 2) {
        newHead = head + 1; // Sağ git
    } else if (direction == 3) {
        newHead = head + 15; // Aşağı git
    } else if (direction == 4) {
        newHead = head - 1; // Sol git
    }

    // Yılanın başını yeşile boyama
    document.getElementById(newHead).style.backgroundColor = 'green';
    
    // Yılanın vücudunu beyaza döndürme (önceki pozisyon)
    document.getElementById(snake[snake.length - 1]).style.backgroundColor = 'white';
    
    // Yılanın başını ve vücudunu güncelleme
    snake.unshift(newHead);
    snake.pop();
}
