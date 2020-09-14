// event listener that runs after entire HTML has loaded
document.addEventListener('DOMContentLoaded', () => {
// allowing js to access our grid
  const grid = document.querySelector('.grid')
// access all 200 divs bruh >.<
// Array.from() allows each grid to have an expecific index
  let squares = Array.from(document.querySelectorAll('.grid div'))
// telling js the size of our grid
  const width = 10

  console.log(squares)
})

// console.log('butts')
