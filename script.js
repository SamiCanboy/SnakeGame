document.body.style.backgroundColor = 'black'
document.body.style.overflow = 'hidden'

let headerDiv = document.createElement('div')
let title = document.createElement('h1')
let gameTable = document.createElement('table')
let description = document.createElement('p')
let snake
let score
let apple
let move
let appleCell
let lastdirection
let rotation;
let touchstartX = 0
let touchendX = 0
let touchstartY = 0
let touchendY = 0
let engine = false
let speed = 400
let direction = 2
// direction: 1 -- Up,
//            2 -- Right
//            3 -- Down
//            4 -- Left

gameTable.style.border = '2px green solid'
gameTable.style.marginLeft = 'auto'
gameTable.style.marginRight = 'auto'
gameTable.style.backgroundColor = 'white'

title.innerHTML = "Snake Game"
title.style.textAlign = 'center'
title.style.color = 'green'
description.innerText = 'For play touch the screen and swipe or use WASD to change direction'
description.style.color = 'red'
description.style.textAlign = 'center'
headerDiv.appendChild(title)
document.body.appendChild(headerDiv)
document.body.appendChild(gameTable)
document.body.appendChild(description)

for (let i = 0; i < 15; i++) {
    let row = document.createElement('tr')
    for (let j = 1; j < 16; j++) {
        let cell = document.createElement('th')
        let cellid = (i*15+j).toString()
        cell.style.backgroundColor = 'white'
        
        cell.id = cellid
        cell.style.width = '40px'
        cell.style.height = '40px'
        cell.style.borderRadius = '40%'
        row.appendChild(cell)
    }
    gameTable.appendChild(row)
}
function adjustCellHeights(newHeight) {
    const cells = gameTable.getElementsByTagName('th')
    for (let cell of cells) {
        cell.style.height = `${newHeight}px`
    }
}
function checkDeviceWidth() {
    let width = window.innerWidth
    if (width <= 480) {
        adjustCellHeights(22)
        return
    } else if (width> 480 && width <= 800) {
        adjustCellHeights(25)
    } 
}
checkDeviceWidth()
function checkDirection() {
    const deltaX = touchendX - touchstartX; // Yatay hareket farkı
    const deltaY = touchendY - touchstartY; // Dikey hareket farkı

    // Mutlak değer farklarını karşılaştır
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Yatay hareket
        if (deltaX > 0 && lastdirection !== 4) {
            direction = 2 // Sağ
        } else if (deltaX < 0 && lastdirection !== 2) {
            direction = 4 // Sol
        }
    } else {
        // Dikey hareket
        if (deltaY > 0 && lastdirection !== 1) {
            direction = 3 // Aşağı
        } else if (deltaY < 0 && lastdirection !== 3) {
            direction = 1 // Yukarı
        }
    }
}


document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
  touchstartY = e.changedTouches[0].screenY

})
document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  touchendY = e.changedTouches[0].screenY

  checkDirection()
})
gameTable.setAttribute('onclick','tableClick()')
function tableClick() {
    if (engine == false) {
        run()
        engine = true
    }else{
    }
}
function finish() {
    clearInterval(move)
    appleCell.style.backgroundImage = ""   
    alert(`Score: ${score}`)
    engine = false
    
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
    for (let i = 1; i <= 225; i++) {
        document.getElementById(i.toString()).style.backgroundColor = 'white'
        document.getElementById(i.toString()).style.innerHTML = ''
    }
    direction = 2
    rotation = -90
    score = 0
    snake = [112,111,110,109]
    
    createApple()
    move = setInterval(function() {
        moveSnake();
    }, speed); // Yılanı her 400ms'de bir hareket ettir
    document.addEventListener('keydown', function(event) {
    
        if (direction !== 3 && lastdirection !== 3 && (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp')) {
            direction = 1 // Yukarı
        } else if (direction !== 4 && lastdirection !== 4 && (event.key === 'd'||event.key === 'S'||event.key === 'ArrowRight')) {
            direction = 2 // Sağ (2)
        } else if (direction !== 1 && lastdirection !== 1 && (event.key === 's'||event.key === 'S'||event.key === 'ArrowDown')) {
            direction = 3 // Aşağı (3)
        } else if (direction !== 2 && lastdirection !== 2 && (event.key === 'a'||event.key === 'A'||event.key === 'ArrowLeft')) {
            direction = 4 // Sol (4)
        }
    });
}
function moveSnake() {
    document.getElementById(snake[0]).style.backgroundImage = ''
    if (snake.length == 225) {
        win()
    }
    let head = snake[0] // Yılanın başı
    let newHead
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
            newHead = head + 1; // Sağa git
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
            newHead = head - 1 // Sola git
        }
        rotation = -90
        lastdirection = 4
    }
    title.innerHTML = `Score: ${score}`
    console.log(newHead,'---',snake)

    // Yılanın başını yeşile boyama
    let snakeHead = document.createElement('img')
    snakeHead.src = 'assets/snakehead.png'
    snakeHead.style.display = 'block'
    snakeHead.style.height = '90%'
    snakeHead.style.width = '90%'
    snakeHead.style.transform = `rotate(${rotation}deg)`
    document.getElementById(newHead).appendChild(snakeHead)
    document.getElementById(snake[0]).style.backgroundColor = 'green'
    document.getElementById(snake[0]).innerHTML = ''
    
    // Yılanın vücudunu beyaza döndürme (önceki pozisyon)
    document.getElementById(snake[snake.length - 1]).style.backgroundColor = 'white'
    
    // Yılanın başını ve vücudunu güncelleme
    snake.unshift(newHead);
    for (let f = 1; f < snake.length; f++) {
        if (newHead == snake[f]) {
            finish()
            document.getElementById(newHead).innerHTML = ''
            document.getElementById(newHead).style.backgroundColor = 'red'
            return
        }
    }
    if (newHead === apple) {
        document.getElementById(apple).style.backgroundImage = ''
        score += 1;
        createApple()
        snake.push[undefined]
        if (score%10==0) {
            speed -= 15
            clearInterval(move)
            move = setInterval(function() {
                moveSnake();
            }, speed);
            
        }
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
    engine = false
}
