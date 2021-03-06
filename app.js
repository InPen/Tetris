// event listener that runs after entire HTML has loaded
document.addEventListener('DOMContentLoaded', () => {
// allowing js to access our grid
  const grid = document.querySelector('.grid')
// access all 200 divs bruh >.<
// Array.from() allows each grid to have an expecific index
  let squares = Array.from(document.querySelectorAll('.grid div'))
// acces span to display score
  const scoreDisplay = document.getElementById('score')
// button functionality
  const startButton = document.getElementById('startButton')
// telling js the size of our grid
  const width = 10
// create timmer
  let timerId
  let score = 0
  let nextRandom = 0


//Tetrominoes
//each array index represents a part of the tetromino shape
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
  ]

  const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ]

  const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
  ]

  const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ]

  const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
  // console.log(tetrominoes)
  let currentPosition = 4
// passes every first rotation of every random tetromino
  let currentRotation = 0
// randomly select tetromino and rotation
  let random = Math.floor(Math.random()*tetrominoes.length)
  // console.log(random)
  let current = tetrominoes[random][currentRotation]
  // console.log(current)
// draw tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }
// see shape on grid
  // draw()

//undraw tetromino
  function undraw(){
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }


//make tetromino go down grid
  // timerId = setInterval(moveDown, 1000)

//eventListeners for keyCodes
  function control(event) {
    if(event.keyCode === 37) {
      moveLeft()
    } else if (event.keyCode === 38) {
      rotate()
    } else if (event.keyCode === 39) {
      moveRight()
    } else if (event.keyCode === 40) {
      moveDown()
    }
  }
  document.addEventListener('keyup', control)

//move down function
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }
//stop shape and counter from keep going off the grid using '.some' (if at least 1 statement is true some will run)
  function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
// have a new tetromino fall
//passing nextRandom value into the random value
      random = nextRandom
      nextRandom = Math.floor(Math.random() * tetrominoes.length)
      current = tetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }


//move tetrominoes left
//stop tetrominoes once they're at the edge
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if(!isAtLeftEdge) currentPosition -=1
// if some of the squares go into the left space that has a div of class 'taken' push it back one space
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition +=1
    }
    draw()
  }

// move tetrominoes right
//stop tetrominoes once they're at the edge
  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
    if(!isAtRightEdge) currentPosition +=1
// if some of the squares go into the right space that has a div of class 'taken' push it back one space
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }
    draw()
  }


//rotate tetromino by assigning to a key
  function rotate() {
    undraw()
    currentRotation ++
// if index = 4 (current amount of shapes) go back to the first rotation
    if(currentRotation === current.length) {
      currentRotation = 0
    }
    current = tetrominoes[random][currentRotation]
    draw()
  }

//show incoming shape
  const displaySquares = document.querySelectorAll('.miniGrid div')
  const displayWidth = 4
  let displayIndex = 0
//array of tetraminoes in their first rotation
//we'll only be displaying what shape is coming up next to the user, not it's exact location
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2],//tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]

  function displayShape() {
//remove trace of tetromino on miniGrid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
    })
    upNextTetrominoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
    })
  }

// start and pause functionality
  startButton.addEventListener('click', () => {
    // console.log('butts')
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random()*tetrominoes.length)
      displayShape()
    }
  })

//add score
  function addScore() {
    for (let i=0; i < 199; i +=width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
      if(row.every(index => squares[index].classList.contains('taken'))) {
        score +=10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
        })
//rome all the divs that have been filled in the first buttom row
        const squaresRemoved = squares.splice(i, width)
        // console.log(squaresRemoved)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

//!!gameOver!!
  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'Game Over'
      clearInterval(timerId)
// game clears and reloads but `Game Over` message disappears too fast
      window.location.reload()

    }
  }


  // console.log(squares)
})

// console.log('butts')
