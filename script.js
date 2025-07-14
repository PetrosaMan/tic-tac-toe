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
      console.log('board square is already taken');
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
			// This method is used to
      // print board to the console.
	  	console.table(board);       
  }

  function clearBoard () { 
    console.log('Clear board called');             
    board.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => { 
        board[rowIndex][columnIndex] = '';        
        });
    }); 
    updateBoard();    
    gameController.setActivePlayer(gameController.players);
    console.log("Players: ", gameController.players);       
  }

  function boardIsFull() { 
    if(!(board.flat(1).includes(''))) {
      printBoard();
      console.log("board is full");      
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

/***********************************/

function createPlayer (name, token) { 
	// factory function
  return {
     name,
     token,
     // No methods yet unless needed    
  };  
}

const gameController = ( function(player1 = 'player-1',player2 = 'player-2') {  
  // players array
  const players = [];
  players.push(createPlayer(player1, 'X'));
  players.push(createPlayer(player2, 'O'));   
	
	let activePlayer = players[0];

  const setActivePlayer = (players) => {
    return activePlayer = players[0];
  }

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
    //gameBoard setBoardSquare    
    const squareSet = gameBoard.setBoardSquare(parseInt(rowColArr[0]), parseInt(rowColArr[1]), gameController.getActivePlayer().token);
    if(!squareSet) {
      return;
    }   	  

    // check for game winner
    if(gameBoard.gameOver()) {
      gameBoard.updateBoard();
      document.getElementById("game-winner").innerText = "Game Over," + " " + "Winner is: " + gameController.getActivePlayer().name;                      
      return;
    } else if(gameBoard.boardIsFull()) {      
        console.log("game drawn");
        gameBoard.updateBoard();
        document.getElementById("game-winner").innerText = "It's a draw"; 
      return;
    }            

	   // Switch player turn
      switchPlayerTurn();
      printNewRound();
     gameBoard.updateBoard();
  }
 
	// Initial play game message    
    printNewRound();    
    
    return {
              playRound, getActivePlayer, players, setActivePlayer
           }

})(); // IIFE module gameController


function playRowColumn(rowColStr){     
  gameController.playRound(rowColStr);  
}

// multibutton to place token on board
  document.
  getElementById("button-row")
  .addEventListener("click", function (event) {
    if(!gameInitialized) {
      alert("Please enter both players names to start the game!");
      return;
    }
    if(gameBoard.gameOver()) {
      return;
    }    
    if (event.target.matches("button")) {      
	  const rowColStr = event.target.value;
	  playRowColumn(rowColStr);			
    }
	return;
  });

  // get player names
  const player1 = document.querySelector('.player-1');
  const player2 = document.querySelector('.player-2');
  const btn1 = document.querySelector('.btn-1');
  let gameInitialized = false;  

  btn1.addEventListener('click', () => {      
    if (player1.value === "" || player2.value === "") {
        alert("Enter both player names to start the game!");
        return;
    } else if (player1.value.toUpperCase() === player2.value.toUpperCase()) { 
        alert("Players names cannot not be the same!")
    } else {
        gameInitialized = true;
    }   
      const name1 = player1.value.trim();
      const name2 = player2.value.trim();     
      gameController.players[0].name = name1;
      gameController.players[1].name = name2;            
      gameBoard.clearBoard();
      document.getElementById("game-winner").innerText = "";
     
  });      
      


 