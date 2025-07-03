'use strict'

const gameBoard = ( function () {       
    const rows = 3;
    const columns = 3;
    const board = Array.from({ length: rows }, () => Array(columns).fill(''));
    
  function getBoard() {
      return board;
  }
	function getBoardSquare() {
		// code here
	}
	function setBoardSquare(row, column, token) {
    alert('setBoardSquare called');
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
     return !(board.flat(1).includes(''));  
  }
  
  function squareAvailable(row, column) {
    return board[row][column] === '';
  }


  return { getBoard, getBoardSquare, setBoardSquare,
       updateBoard, printBoard, clearBoard, boardIsFull, squareAvailable };
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

	const playRound = (row, column) => {
		// place a token for the current player
    if(gameBoard.boardIsFull()) {
      console.log("game board is full")
      return;
    } else {
      console.log("game board is not full");
      return
    }
    gameBoard.setBoardSquare(row, column, getActivePlayer().token);


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


gameBoard.setBoardSquare(0, 0, 'X');
gameBoard.setBoardSquare(0, 1, 'O');
gameBoard.setBoardSquare(0, 2 , 'X');
gameBoard.setBoardSquare(1, 0, 'O');
gameBoard.setBoardSquare(1, 2, 'O');
gameBoard.setBoardSquare(2, 0, 'X');
gameBoard.setBoardSquare(2, 1, 'O');
gameBoard.setBoardSquare(2, 2, 'X');


gameController.playRound(0,0);
