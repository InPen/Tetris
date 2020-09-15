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
    [0, width, width+1, width2*1],
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

  const tetraminoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
  console.log(squares)
})

// console.log('butts')
