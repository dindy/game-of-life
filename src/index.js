const nbCols = 350
const nbRows = 200
 const sizeFactor = 5


const getEmptyBoard = (nbCols, nbRows) => new Array(nbCols * nbRows).fill(0)

const randomizeBoard = board => board.map(cell => Math.floor(Math.random() * 2))

const getCellCoordinate = (index, nbCols) => ({
        x : index % nbCols,
        y : index / nbCols
    })


const getNeighbourArray = (index, board, nbCols) => {
    const y = index / nbCols
    const x = index % nbCols
    const position = getCellCoordinate(index, nbCols)

    let topLeftCellIndex = index - 1 - nbCols
    let topMiddleCellIndex = index - nbCols
    let topRightCellIndex = index + 1 - nbCols
    
    let bottomLeftCellIndex = index - 1 + nbCols
    let bottomMiddleCellIndex = index + nbCols
    let bottomRightCellIndex = index + 1 + nbCols
    
    let leftCellIndex = index - 1
    let rightCellIndex = index + 1

    // First col
    if (position.x === 0) {
        topLeftCellIndex = undefined
        leftCellIndex = undefined
        bottomLeftCellIndex = undefined
    
    // Last col
    } else if (position.x === nbCols - 1) {
        topRightCellIndex = undefined
        rightCellIndex = undefined
        bottomRightCellIndex = undefined        
    }

    // First row
    if (position.y === 0) {
        topLeftCellIndex = undefined
        topMiddleCellIndex = undefined
        topRightCellIndex = undefined
    
    // Last row
    } else if (position.y === board.length / nbCols) {
        bottomLeftCellIndex = undefined 
        bottomMiddleCellIndex = undefined 
        bottomRightCellIndex = undefined     
    }

    return [
        board[topLeftCellIndex],
        board[topMiddleCellIndex],
        board[topRightCellIndex],
        board[bottomLeftCellIndex],
        board[bottomMiddleCellIndex],
        board[bottomRightCellIndex],
        board[leftCellIndex],
        board[rightCellIndex],        
    ]

}
const getNextStateCell = (index, board, nbCols) => {  
    
    const neighbourState = getNeighbourArray(index, board, nbCols)

    const sum = neighbourState.reduce((total, neighbourState) => {
        
        return typeof neighbourState === "undefined" ? total : total + neighbourState
    }, 0)

    if( sum <= 2) {
        return 0
    } else if (sum >= 4){
        return 0
    }else if (sum === 3){
        return 1
    }
}  


const getNextBoard = (board, nbCols) => board.map((cell, index) => getNextStateCell(index, board, nbCols))

const launchGame = (nbCols, nbRows, sizeFactor) => {
    let interval
    const board = getEmptyBoard(nbCols, nbRows)
    const rdmBoard = randomizeBoard(board)
 
    const canvas = new Canvas(nbCols, nbRows, sizeFactor)

    let nextBoard = getNextBoard(rdmBoard, nbCols)
    interval = setInterval(() => {
        nextBoard = getNextBoard(nextBoard, nbCols)
        
        canvas.paintBoard(nextBoard)
    }, 500);

}

function Canvas(nbCols, nbRows, sizeFactor) {
    const canvas = document.querySelector("canvas")
    const context = canvas.getContext('2d')
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;

    this.paintBoard = (board) => {
        context.clearRect(0, 0, sizeFactor * nbCols, sizeFactor * nbRows);
        board.forEach((cell, index) => {
            const position = getCellCoordinate(index, nbCols)
            if(cell === 0){
            } else {
                context.fillStyle = 'black';
                context.fillRect(position.x * sizeFactor, position.y * sizeFactor, sizeFactor, sizeFactor);
            }
        })
    }
}
const playBtn = document.querySelector('#playBtn')
playBtn.addEventListener('click', ()=>{
    launchGame(nbCols, nbRows, sizeFactor)
})
