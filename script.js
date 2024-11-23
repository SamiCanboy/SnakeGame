document.body.style.backgroundColor = 'black'
let headerDiv = document.createElement('div')
let title = document.createElement('h1')
let gameTable = document.createElement('table')
let playButton = document.createElement('button')
let buttonDiv = document.createElement('div')
let score
let apple
let move
playButton.setAttribute('onclick','run()'

)
let direction = 2;
// direction: 1 -- Up,
//            2 -- Right
//            3 -- Down
//            4 -- Left
let snake;
for (let i = 0; i < 15; i++) {
    let row = document.createElement('tr')
    for (let j = 1; j < 16; j++) {
        let cell = document.createElement('th')
        let cellid = (i*15+j).toString()
        cell.style.backgroundColor = 'white'
        
        cell.id = cellid
        cell.style.width = '30px'
        cell.style.height = '30px'
        cell.style.borderRadius = '40%'
        row.appendChild(cell);
    }
    gameTable.appendChild(row);
}


gameTable.style.marginLeft = 'auto'
gameTable.style.marginRight = 'auto'
gameTable.style.backgroundColor = 'white'
title.innerHTML = "Snake Game"
title.style.textAlign = 'center'
title.style.color = 'green'

headerDiv.appendChild(title)
buttonDiv.appendChild(playButton)
document.body.appendChild(headerDiv)
document.body.appendChild(gameTable)
document.body.appendChild(buttonDiv)
function finish() {
    alert(`Score: ${(snake.length)-4}`)
    clearInterval(move)
    for (let f = 0; f < 226; f++) {
        document.getElementById(f).style.backgroundColor = 'white'
    }
    alert(`Score: ${(snake.length)-4}`)
}
function createApple() {
    do {
        apple = Math.floor(Math.random() * 225) + 1
    }while (snake.includes(apple))
    document.getElementById(apple).style.backgroundColor = 'red'
}
function run() {
    score = 0
    snake = [112,111,110,109];
    
    createApple()
    move = setInterval(function() {
        moveSnake();
    }, 1000); // Yılanı her 400ms'de bir hareket ettir
    document.addEventListener('keydown', function(event) {
        if (direction != 3 && (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp')) {
            direction = 1; // Yukarı
        } else if (direction != 4 && event.key === 'd'||event.key === 'S'||event.key === 'ArrowRight') {
            direction = 2; // Sağ (2)
        } else if (direction != 1 && event.key === 's'||event.key === 'S'||event.key === 'ArrowDown') {
            direction = 3; // Aşağı (3)
        } else if (direction != 2 && event.key === 'a'||event.key === 'A'||event.key === 'ArrowLeft') {
            direction = 4; // Sol (4)
        }
    });
}

function moveSnake() {
    
    let head = snake[0]; // Yılanın başı
    let newHead;
    if (direction === 1) {
        if (head<16) {
            newHead = head + 210
        }
        else{
            newHead = head - 15; // Yukarı git
        }
        
    } else if (direction === 2) {
        if (head%15===0) {
            newHead = head - 14
        }
        else{
            newHead = head + 1; // Sağ git
        }
        
    } else if (direction === 3) {
        if (head>210) {
            newHead = head - 210
        }
        else{
            newHead = head + 15; // Aşağı git
        }
        
    } else if (direction === 4) {
        if ((newHead - 1) % 15 ==0) {
            newHead = head + 14
        }
        else{
            newHead = head - 1; // Sol git
        }
    }
    title.innerHTML = `Score: ${score}||${newHead}||${snake}`

    // Yılanın başını yeşile boyama
    document.getElementById(newHead).style.backgroundColor = 'blue';
    document.getElementById(snake[0]).style.backgroundColor = 'green';

    // Yılanın vücudunu beyaza döndürme (önceki pozisyon)
    document.getElementById(snake[snake.length - 1]).style.backgroundColor = 'white';
    
    // Yılanın başını ve vücudunu güncelleme
    snake.unshift(newHead);
    for (let f = 1; f < snake.length; f++) {
        if (newHead == snake[f]) {
            finish()
            clearInterval(move)
        }
    }
    if (newHead === apple) {
        score += 1;
        createApple()
        snake.push[undefined]
        return
    }
    snake.pop();
    
}
