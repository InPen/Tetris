// event listener that runs after entire HTML has loaded
document.addEventListener('DOMContentLoaded', () => {
// allowing js to access our grid
  const grid = document.querySelector('.grid')
// access all 200 divs bruh >.<
// Array.from() allows each grid to have an expecific index
  let squares = Array.from(document.querySelectorAll('.grid div'))
// acces span to display score
  const scoreDisplay = document.getElementById('#score')
// button functionality
  const startButton = document.getElementById('#startButton')
// telling js the size of our grid
  const width = 10


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
  timerId = setInterval(moveDown, 1000)
//move down function
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
  }
//stop shape and counter from keep going off the grid using '.some' (if at least 1 statement is true some will run)
  function freeze() {
    if(current.some(index + squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    }
  }








  // console.log(squares)
})

// console.log('butts')
