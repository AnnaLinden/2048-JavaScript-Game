document.addEventListener('DOMContentLoaded', () =>  {
  const gridDisplay = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')
  let squares = []
  const width = 5
  let score = 0

  //create the playing board
  function createBoard() {
    for (let i=0; i < width*width; i++) {
      square = document.createElement('div')
      square.innerHTML = 0
      gridDisplay.appendChild(square)
      squares.push(square)
    }
    generate()
    generate()
  }
  createBoard()

  //generate a new number
  function generate() {
    randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2
      checkForGameOver()
    } else generate()
  }

  function moveRight() {
    for (let i=0; i < 25; i++) {
      if (i % 5 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour = squares[i+3].innerHTML
        let totalFive = squares[i+4].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour), parseInt(totalFive)]

        let filteredRow = row.filter(num => num)
        let missing = 5 - filteredRow.length //
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)

        squares[i].innerHTML = newRow[0]
        squares[i +1].innerHTML = newRow[1]
        squares[i +2].innerHTML = newRow[2]
        squares[i +3].innerHTML = newRow[3]
        squares[i +4].innerHTML = newRow[4]
      }
    }
  }

  function moveLeft() {
    for (let i=0; i < 25; i++) {
      if (i % 5 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour = squares[i+3].innerHTML
        let totalFive = squares[i+4].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour), parseInt(totalFive)]

        let filteredRow = row.filter(num => num)
        let missing = 5 - filteredRow.length //
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)

        squares[i].innerHTML = newRow[0]
        squares[i +1].innerHTML = newRow[1]
        squares[i +2].innerHTML = newRow[2]
        squares[i +3].innerHTML = newRow[3]
        squares[i +4].innerHTML = newRow[4]
      }
    }
  }


  function moveUp() {
    for (let i=0; i < 5; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let totalFive = squares[i+(width*4)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour), parseInt(totalFive)]

      let filteredColumn = column.filter(num => num)
      let missing = 5 - filteredColumn.length //
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)

      squares[i].innerHTML = newColumn[0]
      squares[i +width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
      squares[i+(width*4)].innerHTML = newColumn[4]
    }
  }

  function moveDown() {
    for (let i=0; i < 5; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let totalFive = squares[i+(width*4)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour), parseInt(totalFive)]
      

      let filteredColumn = column.filter(num => num)
      let missing = 5 - filteredColumn.length 
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)

      squares[i].innerHTML = newColumn[0]
      squares[i +width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
      squares[i+(width*4)].innerHTML = newColumn[4]
    }
  }

  function combineRow() {
    for (let i =0; i < 24; i++) {
      if (squares[i].innerHTML === squares[i +1].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +1].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i +1].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
      checkForWin()
    }

  function combineColumn() {
    for (let i =0; i < 20; i++) {
      if (squares[i].innerHTML === squares[i +width].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i +width].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  //assign functions to keyCodes
  function control(e) {
    if(e.keyCode === 37) {
      keyLeft()
    } else if (e.keyCode === 38) {
      keyUp()
    } else if (e.keyCode === 39) {
      keyRight()
    } else if (e.keyCode === 40) {
      keyDown()
    }
  }
  document.addEventListener('keyup', control)

  function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    generate()
  }

  function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
  }

  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
  }

  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
  }

  //check for the number 2048 in the squares to win
  function checkForWin() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = 'You WIN'
        document.removeEventListener('keyup', control)
        setTimeout(() => clear(), 3000)
      }
    }
  }

  //check if there are no zeros on the board to lose
  function checkForGameOver() {
    let zeros = 0
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = 'You LOSE'
      document.removeEventListener('keyup', control)
      setTimeout(() => clear(), 3000)
    }
  }

  //clear timer
  function clear() {
    clearInterval(myTimer)
  }


  //add colours
  function addColours() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#4D4D4D'
      else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#B53570'
      else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#00C7FE' 
      else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#FF0149' 
      else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#01A16D' 
      else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#DEB50C' 
      else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#7301FF' 
      else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#2B1DB0' 
      else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#EA2F07' 
      else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#C27126' 
      else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#F5138B' 
      else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#0166FE' 
    }
}
addColours()

var myTimer = setInterval(addColours, 50)

})