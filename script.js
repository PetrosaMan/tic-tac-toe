'use strict'

const gameBoard = ( function () {       
    const rows = 3;
    const columns = 3;
    const board = Array.from({ length: rows }, () => Array(columns)
    .fill(''));    
    
  function getBoard() {
      return board;
  }
	
	function setBoardSquare(row, column, token) {    
    if(board[row][column] === 'X' || board[row][column] === 'O') {
      alert('board square is already taken');
      return false;     
    } else {
      board[row][column] = token;
      return true; 
    }      	
  }	
	function updateBoard() {
    //console.log("update board function called");
		const flatBoard = board.flat();
    const buttons = document.querySelectorAll('#button-row button');
    
    flatBoard.forEach((char, index) => {
      if (buttons[index]) {
      buttons[index].innerText = char;
      }
    })  
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

  function gameOver() {
    if(getWinningRow() || getWinningColumn() || getWinningDiagonal()) {
      return true;
    } else {
      return false;  
    }
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

    for(let row = 0; row < size; row++) {
      rightDiagonal.push(board[row][--diag])
    }
    winner = (rightDiagonal.every(element => element.includes('X')))||
             ( rightDiagonal.every(element => element.includes('O'))); 
    
    if(winner) {
      //updateBoard
      return winner;
    };         
    
    for(let row = 0; row < size; row++) {  	  
	    leftDiagonal.push(board[row][row]);
    }
        
    winner = (leftDiagonal.every(element => element.includes('X')))||
             ( leftDiagonal.every(element => element.includes('O')));
    return   winner;
  }  

  return { getBoard, setBoardSquare, updateBoard, printBoard, clearBoard,boardIsFull, squareAvailable,  getWinningDiagonal, getWinningColumn, getWinningRow, gameOver };

} )(); // IIFE function


function createPlayer (name, token) { 
	// factory function
  return {
     name,
     token,
     // No methods yet unless needed    
  };  
} 

const gameController = ( function (player1 = "player-1", player2 = "player-2") {  
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
      //gameBoard.printBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
    };	

	const playRound = (rowColArr) => {
		// place a token for the current player    
    //gameBoard setBoardSquare
    const squareSet = gameBoard.setBoardSquare(parseInt(rowColArr[0]), parseInt(rowColArr[1]), gameController.getActivePlayer().token);
    if(!squareSet) {
      return;
    }   	  

    // check for game winner
    if(gameBoard.gameOver()) {
      gameBoard.updateBoard();
      document.getElementById("game-winner").innerText = "Game Over" + " " + "Winner is: " + gameController.getActivePlayer().name;                      
      return;
    } else if(gameBoard.boardIsFull()) {      
        alert("game drawn");
      return;
    }            

	   // Switch player turn
      switchPlayerTurn();
      printNewRound();
     gameBoard.updateBoard();
  }
 
	// Initial play game message    
    printNewRound();

    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return { playRound, getActivePlayer }

})(); // IIFE module gameController



function playRowColumn(rowColStr){     
  gameController.playRound(rowColStr);
  //document.getElementById('input').value = '';
}

// get row and column where user wants to add a token ('X' or 'O')
/*const input = document.getElementById('input');
input.addEventListener('keydown', function(event){
  if(event.key === 'Enter'){
    const rowColStr = input.value;       
    playRowColumn(rowColStr);    
  }  
}); 
*/

// multibutton to place token on board
document.addEventListener('DOMContentLoaded', function() {
  document.
  getElementById("button-row")
  .addEventListener("click", function (event) {
    if(gameBoard.gameOver()) {
      return;
    }    
    if (event.target.matches("button")) {      
	  const rowColStr = event.target.value;
	  playRowColumn(rowColStr);			
    }
	return;
  });
});