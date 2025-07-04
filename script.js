'use strict'

const gameBoard = ( function () {       
    const rows = 3;
    const columns = 3;
    const board = Array.from({ length: rows }, () => Array(columns).fill(''));
    let winningRow;
    let winningColumn;
    let winningDiagonal;
    let winningCombination;
    let winner; // player-1 or player-2
    
  function getBoard() {
      return board;
  }
	function getBoardSquare() {
		// code here
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

  function winningRow() {
    // code here
    let winner = false;
      for(let row = 0; row < rows; row++) {
          
      //
      }
  }

  function winningColumn() {
    // code here
  }

  function winningDiagonal() {
    // code here
  }

  function getWinningCombination() {

  }

  return { getBoard, getBoardSquare, setBoardSquare,
       updateBoard, printBoard, clearBoard, boardIsFull, squareAvailable, getWinningCombination };
} )(); // IIFE function


function createPlayer (name, token) { 
	// factory function
  return {
     name,
     token,
     // No methods yet unless needed    
  };  
} // create player

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

	    /*  This is where we would check for a winner and handle that logic,
            such as a win message. */

	   // Switch player turn
      switchPlayerTurn();
      printNewRound();
    };

	// Initial play game message    
    printNewRound();

    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return { playRound, getActivePlayer }

})(); // IIFE module gameController


// User plays round from console.
function playRowColumn(rowColArr){
  //debugger;
  console.log(rowColArr);  
  gameController.playRound(rowColArr);
}

// get row and column where user wants to add a token ('X' or 'O')
const input = document.getElementById('input');
input.addEventListener('keydown', function(event){
  if(event.key === 'Enter'){
    const rowCol = input.value;       
    playRowColumn(rowCol);    
  }
}); 
