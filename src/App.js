import { useState, useEffect } from "react"

//set width of board
const width = 8

//set random colors for array
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]

const App = () => {

  //use useState to set random colors array to state
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  //state for square being dragged
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  //state for square being replaced
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)

  //check for column of three same color
  const checkForColumnOfThree = () => {
    for (let i=0; i < 47; i++) {
      const columnOfThree = [i, i +width, i + width *2]
      const decidedColor = currentColorArrangement[i]

      if ( columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }
  //check for column of four
  const checkForColumnOfFour = () => {
    for (let i=0; i < 47; i++) {
      const columnOfFour = [i, i +width, i + width *2, i + width * 3]
      const decidedColor = currentColorArrangement[i]

      if ( columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }
  //check for row of three
  const checkForRowOfThree = () => {
    for (let i=0; i<64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const nonValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]

      if(nonValid.includes(i)) continue

      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        rowOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  //check for row of four
  const checkForRowOfFour = () => {
    for (let i=0; i<64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i +3]
      const decidedColor = currentColorArrangement[i]
      const nonValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

      if(nonValid.includes(i)) continue

      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        rowOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

//move squares to square below
  const moveSquareToSquareBelow = () =>{
    //renders through all squares, thats why squares drop all the way down
    for (let i=0; i<64-width; i++) {
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)
//regenerate firstRow
        if (isFirstRow && currentColorArrangement[i] === '') {
          let randomNumber = Math.floor(Math.random() * candyColors.length)
          currentColorArrangement[i] = candyColors[randomNumber]
        }
//drop squares down
      if (currentColorArrangement[i + width] === ''){
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = ''
      }
  }
}

const dragStart = (e) => {
  console.log(e.target)
  console.log('drag start')
  setSquareBeingDragged(e.target)
}

const dragDrop = (e) => {
  console.log('drag drop')
  setSquareBeingReplaced(e.target)
  
}

const dragEnd = () => {
  console.log('drag end')

  const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
  const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

  currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor
  currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor

  console.log('squareBeingDraggedId', squareBeingDraggedId)
  console.log('squareBeingReplaced', squareBeingReplacedId)
}

//create array of random colors
  const createBoard = () => {
    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)    
    }
    setCurrentColorArrangement(randomColorArrangement)
  }
//run createBoard() once on initial render
  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForColumnOfThree()
      checkForRowOfFour()
      checkForRowOfThree()    
      moveSquareToSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)
  }, [ checkForColumnOfThree, checkForColumnOfFour, checkForRowOfThree, checkForRowOfFour, moveSquareToSquareBelow, currentColorArrangement ])


  return (
    <div className="app">
        <div className="game">
          {/* mapped through random colors and rendered as images */}
            {currentColorArrangement.map((candyColor, index) => (
                <img 
                    key={index}
                    style={{backgroundColor: candyColor}}
                    alt={candyColor}
                    data-id={index}
                    draggable={true}
                    onDragStart={dragStart}
                    onDragOver={(e)=> e.preventDefault()}
                    onDragEnter={(e)=> e.preventDefault()}
                    onDragLeave={(e)=> e.preventDefault()}
                    onDrop={dragDrop}
                    onDragEnd={dragEnd}
                />
                ))}
        </div>  
    </div>
  
    )
  }




export default App
