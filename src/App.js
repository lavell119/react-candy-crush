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

  checkForColumnOfThree() 

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
    checkForColumnOfThree()

  }, [checkForColumnOfThree])

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
