document.body.style.backgroundColor = 'black'

let headerDiv = document.createElement('div')
let title = document.createElement('h1')
let gameTable = document.createElement('table')
let playButton = document.createElement('button')
let buttonDiv = document.createElement('div')
let score
let apple
let move
let appleCell
let lastdirection
let rotation;

playButton.setAttribute('onclick','run(), playButton.style.visibility = `hidden`')
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
        cell.style.width = '50px'
        cell.style.height = '50px'
        cell.style.borderRadius = '40%'
        cell.style.border = '1px solid'
        row.appendChild(cell);
    }
    gameTable.appendChild(row);
}
let touchstartX = 0
let touchendX = 0
    
function checkDirection() {
  if (touchendX < touchstartX) {
    alert('swiped left!')}
  if (touchendX > touchstartX) {
    alert('swiped right!')}
}

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})
gameTable.style.border = '3px red solid'
gameTable.style.marginLeft = 'auto'
gameTable.style.marginRight = 'auto'
gameTable.style.backgroundColor = 'white'
title.innerHTML = "Snake Game"
title.style.textAlign = 'center'
title.style.color = 'green'
playButton.style.marginLeft = 'auto'
playButton.style.margin.Right = 'auto'
playButton.innerHTML = 'Play'
playButton.style.width = '20%'
headerDiv.appendChild(title)
buttonDiv.appendChild(playButton)
document.body.appendChild(headerDiv)
document.body.appendChild(gameTable)
document.body.appendChild(buttonDiv)
function finish() {
    appleCell.style.backgroundImage = ""   
    alert(`Score: ${(snake.length)-5}`)
    clearInterval(move)
    for (let i = 1; i <= 225; i++) {
        document.getElementById(i.toString()).style.backgroundColor = 'white'
    }
    document.getElementById(newHead).removeChild(snakeHead)
    playButton.style.visibility = 'visible'
}
function createApple() {
    do {
        apple = Math.floor(Math.random() * 225) + 1
    }while (snake.includes(apple))
    appleCell = document.getElementById(apple)
    appleCell.style.backgroundImage = "url('assets/apple.png')"
    appleCell.style.backgroundSize = 'cover'
    appleCell.style.backgroundPosition = 'center'
    appleCell.style.backgroundRepeat = 'no-repeat'
}
function run() {
    rotation = -90
    score = 0
    snake = [112,111,110,109];
    
    createApple()
    move = setInterval(function() {
        moveSnake();
    }, 400); // Yılanı her 400ms'de bir hareket ettir
    document.addEventListener('keydown', function(event) {
    
        if (direction != 3 && lastdirection != 3 && (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp')) {
            direction = 1; // Yukarı
        } else if (direction != 4 && lastdirection != 4 && event.key === 'd'||event.key === 'S'||event.key === 'ArrowRight') {
            direction = 2; // Sağ (2)
        } else if (direction != 1 && lastdirection != 1 && event.key === 's'||event.key === 'S'||event.key === 'ArrowDown') {
            direction = 3; // Aşağı (3)
        } else if (direction != 2 && lastdirection != 2 && event.key === 'a'||event.key === 'A'||event.key === 'ArrowLeft') {
            direction = 4; // Sol (4)
        }
        // if (direction != 3 && (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp')) {
        //     direction = 1; // Yukarı
        // } else if (direction != 4 && event.key === 'd'||event.key === 'S'||event.key === 'ArrowRight') {
        //     direction = 2; // Sağ (2)
        // } else if (direction != 1 && event.key === 's'||event.key === 'S'||event.key === 'ArrowDown') {
        //     direction = 3; // Aşağı (3)
        // } else if (direction != 2 && event.key === 'a'||event.key === 'A'||event.key === 'ArrowLeft') {
        //     direction = 4; // Sol (4)
        // }
    });
}
function moveSnake() {
    document.getElementById(snake[0]).style.backgroundImage = ''
    if (snake.length == 225) {
        win()
    }
    let head = snake[0]; // Yılanın başı
    let newHead;
    if (direction === 1) {
        if (head<16) {
            newHead = head + 210
        }
        else{
            newHead = head - 15; // Yukarı git
        }
        rotation = 0
        lastdirection = 1
    } else if (direction === 2) {
        if (head%15===0) {
            newHead = head - 14
        }
        else{
            newHead = head + 1; // Sağ git
        }
        rotation = 90
        lastdirection = 2
    } else if (direction === 3) {
        if (head>210) {
            newHead = head - 210
        }
        else{
            newHead = head + 15; // Aşağı git
        }
        rotation = 180
        lastdirection = 3
    } else if (direction === 4) {
        if ((snake[0] - 1) % 15 == 0) {
            newHead = head + 14
        }
        else{
            newHead = head - 1; // Sol git
        }
        rotation = -90
        lastdirection = 4
    }
    title.innerHTML = `Score: ${score}||${newHead}||${snake}`

    // Yılanın başını yeşile boyama
    let snakeHead = document.createElement('img')
    snakeHead.src = 'assets/snakehead.png'
    snakeHead.style.display = 'block'
    snakeHead.style.height = '100%'
    snakeHead.style.width = '100%'
    snakeHead.style.transform = `rotate(${rotation}deg)`
    document.getElementById(newHead).appendChild(snakeHead)
    // document.getElementById(newHead).backgroundImage = `rotate(${rotation})`
    // document.getElementById(newHead).style.backgroundImage = "url('assets/snakehead.png')";
    // document.getElementById(newHead).style.backgroundSize = 'cover'
    // document.getElementById(newHead).style.backgroundPosition = 'center'
    // document.getElementById(newHead).style.backgroundRepeat = 'no-repeat'
    document.getElementById(snake[0]).style.backgroundColor = 'green';

    document.getElementById(snake[0]).innerHTML = ''

    // Yılanın vücudunu beyaza döndürme (önceki pozisyon)
    document.getElementById(snake[snake.length - 1]).style.backgroundColor = 'white';
    
    // Yılanın başını ve vücudunu güncelleme
    snake.unshift(newHead);
    for (let f = 0; f < snake.length; f++) {
        if (newHead == snake[f]) {
            finish()
            document.getElementById(newHead).innerHTML = ''
            clearInterval(move)
            return
        
        }
    }
    if (newHead === apple) {
        document.getElementById(apple).style.backgroundImage = ''
        score += 1;
        createApple()
        snake.push[undefined]
        return
    }
    snake.pop();
    
}
function win() {
    alert(`Congratulations!! You Won the Game`)
    clearInterval(move)
    for (let i = 1; i <= 225; i++) {
        document.getElementById(i.toString()).style.backgroundColor = 'white'
    }
}
