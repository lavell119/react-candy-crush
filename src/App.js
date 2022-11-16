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

  const checkForColumnOfFour = () => {
    for (let i=0; i < 47; i++) {
      const columnOfFour = [i, i +width, i + width *2, i + width * 3]
      const decidedColor = currentColorArrangement[i]

      if ( columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

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
      checkForRowOfThree()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)
  }, [ checkForColumnOfThree, checkForColumnOfFour, checkForRowOfThree, currentColorArrangement ])

  console.log(currentColorArrangement)

  return (
    <div className="app">
        <div className="game">
          {/* mapped through random colors and rendered as images */}
            {currentColorArrangement.map((candyColor, index) => (
                <img 
                    key={index}
                    style={{backgroundColor: candyColor}}
                    alt={candyColor}
                />
                ))}
        </div>  
    </div>
  
    )
  }




export default App
