'use strict'

const gameBoard = ( function () {       
    const rows = 3;
    const columns = 3;
    const board = Array.from({ length: rows }, () => Array(columns).fill(''));
    //let winningRow;
    //let winningColumn;
    //let winningDiagonal;
    //let winningCombination;
    
    
  function getBoard() {
      return board;
  }
	
	function setBoardSquare(row, column, token) {    
    if(board[row][column] === 'X' || board[row][column] === 'O') {
      //console.log('board square is already taken');
      alert('board square is already taken');
    } else {
      board[row][column] = token; 
    }      	
  }	
	function updateBoard() {
		// code here
  }

  function printBoard()  {
			// This method will be used to
      // print board to the console.
	  	console.table(board);       
  }

  function clearBoard () {           
    board.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => { 
        board[rowIndex][columnIndex] = '';        
        });
    });        
  }
  function boardIsFull() { 
    if(!(board.flat(1).includes(''))) {
      printBoard();
      alert("board is full");
      return true;
    } else {
      return false; 
    }      
  }
  
  function squareAvailable(row, column, token) {
    if(board[row][column] === 'X' || board[row][column] === 'O') {
      return;
    }
    setBoardSquare(row, column, token);
    return;
  }

  function getWinningRow() {
    // check for a winning row
    let winner = false;
    let winRow =[];
    const size = rows;

    for(let row = 0; row < size; row++) {
		for(let col = 0; col < size; col++) {
			winRow.push(board[row][col]);
		}
		//console.log('winRow:',winRow);
		winner =  (winRow.every(element => element.includes('X'))) ||
				  (winRow.every(element => element.includes('O')));
				  
		if(winner) { 
			return winner;
		} 
		winRow = [];	
	}
		return winner;     
  }

  function getWinningColumn() {
    // check for a winning column
    const size = columns;  
    let winCol =[];
	  let  winner = false;

    for(let col = 0; col < size; col++) {
		for(let row = 0; row < size; row++) {
			winCol.push(board[row][col]);
		}
		//console.log('winCol:',winCol);
		winner =  (winCol.every(element => element.includes('X'))) ||
				  (winCol.every(element => element.includes('O')));
				  
		if(winner) { 
			return winner;
		} 
		winCol = [];	
	}
		return winner;
  }

  function getWinningDiagonal() {
    // check for a winning diagonal
    let size = rows;
    let diag = size;
    let winner = false;
    const leftDiagonal = [];
    const rightDiagonal = [];
    //console.log("getWinningDiagonal function called");

    for(let row = 0; row < size; row++) {
      rightDiagonal.push(board[row][--diag])
    }
    winner = (rightDiagonal.every(element => element.includes('X')))||
             ( rightDiagonal.every(element => element.includes('O'))); 
    
    if(winner) {
      return winner;
    };         
    
    for(let row = 0; row < size; row++) {  	  
	    leftDiagonal.push(board[row][row]);
    }
        
    winner = (leftDiagonal.every(element => element.includes('X')))||
             ( leftDiagonal.every(element => element.includes('O')));
    return   winner;
  }  

  return { getBoard, setBoardSquare, updateBoard, printBoard, clearBoard,boardIsFull, squareAvailable,  getWinningDiagonal, getWinningColumn, getWinningRow };

} )(); // IIFE function


function createPlayer (name, token) { 
	// factory function
  return {
     name,
     token,
     // No methods yet unless needed    
  };  
} 

const gameController = ( function (player1 = "David", player2 = "Michael") {  
  // players array
  const players = [];
  players.push(createPlayer(player1, 'X'));
  players.push(createPlayer(player2, 'O'));   
	
	let activePlayer = players[0];

	const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

	const getActivePlayer = () => activePlayer;

	const printNewRound = () => {
      gameBoard.printBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
    };	

	const playRound = (rowColArr) => {
		// place a token for the current player
    if(gameBoard.boardIsFull()) {
      console.log("game board is full")
      return;
    }
    //gameBoard setBoardSquare
    gameBoard.setBoardSquare(parseInt(rowColArr[0]), parseInt(rowColArr[1]), gameController.getActivePlayer().token);

	    /* Check for a winner and handle that logic,
            such as a win message. */
    const diagonalWinner = gameBoard.getWinningDiagonal();     
    const rowWinner = gameBoard.getWinningRow();
    const columnWinner = gameBoard.getWinningColumn();

    // check for game winner
    if(diagonalWinner || rowWinner || columnWinner) {
        console.log("winner is: ", gameController.getActivePlayer().name);
        console.log("game over");
        console.log(gameBoard.getBoard());        
        return;
    }            

	   // Switch player turn
      switchPlayerTurn();
      printNewRound();
    
  }
	// Initial play game message    
    printNewRound();

    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return { playRound, getActivePlayer }

})(); // IIFE module gameController


// User plays round from console.
function playRowColumn(rowColArr){  
  console.log(rowColArr);  
  gameController.playRound(rowColArr);
  document.getElementById('input').value = '';
}

// get row and column where user wants to add a token ('X' or 'O')
const input = document.getElementById('input');
input.addEventListener('keydown', function(event){
  if(event.key === 'Enter'){
    const rowCol = input.value;       
    playRowColumn(rowCol);    
  }  
}); 
