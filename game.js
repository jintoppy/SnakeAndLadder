window.MyGame = window.MyGame || {};
window.MyGame.Game = (function(){
	var state = {
		player1: 0,
		player2: 0,
		nextPlayer: 1
	},
	player1, player2;

	function _reset(){
		state = {
				player1: 0,
				player2: 0,
				nextPlayer: 1
			};
		window.localStorage.removeItem("game_state");
		_initialize();
	}

	function _init(){
		if(!_restoreFromLocalStorage()){
			 _reset();
		}
	}

	function _initialize(){
		MyGame.Dice.init();
		MyGame.Board.init();
		_addEventListeners();
	}

	function _checkIfOver(state){
		if(state.player1 >= 100){
			alert("Player1 won");
			return true;
		}
		else if(state.player2 >= 100){
			alert("Player2 won");
			return true;
		}
		return false;
	}

	var snakePositions = MyGame.Board.getSnakePositions(),
		ladderPositions = MyGame.Board.getLadderPositions(),
		bummerPositions = MyGame.Board.getBummerPositions();
	function _checkIfUpOrDown(newVal){
		for(var i=0; i<snakePositions.length;i++){
			var pos = snakePositions[i];
			if(pos.src === newVal){
				return newVal - pos.diff;
			} 
		}

		for(var j=0; j<ladderPositions.length;j++){
			var pos = ladderPositions[j];
			if(pos.src === newVal){
				return newVal + pos.diff;
			}	
		}
		return newVal;
	}

	function _checkIfBummer(newVal){
		for(var i=0; i<bummerPositions.length;i++){
			var pos = bummerPositions[i];
			if(pos.src === newVal){
				return true;
			} 
		}
		return false;
	}

	function _setState(newNum){
		var bummer = false;
		if(state.nextPlayer === 1){
			state.player1 +=newNum;
			state.player1 = _checkIfUpOrDown(state.player1);
			if(_checkIfBummer(state.player1)){
				state.player2 = 1;
				bummer = true;
			}
		}
		else{
			state.player2 +=newNum;	
			state.player2 = _checkIfUpOrDown(state.player2);
			if(_checkIfBummer(state.player2)){
				state.player1 = 1;
				bummer = true;
			}
		}
		var gameOver = _checkIfOver(state);
		if(gameOver){
			_reset();
		}
		else{
			MyGame.Board.setBoardAsPerNewState(state,bummer);
			state.nextPlayer = state.nextPlayer === 1? 2: 1;
			_saveToLocalStorage(state);
		}
	}


	function _restoreFromLocalStorage(){
		var storage  = window.localStorage.getItem("game_state");
		if(storage){
			_initialize();
			state = JSON.parse(storage);
			MyGame.Board.restoreBoardState(state);
			return true;
		}
		else{
			return false;
		}
	}

	function _saveToLocalStorage(state){
		window.localStorage.setItem("game_state", JSON.stringify(state));
	}

	function _triggerRoll(){
		_setState(MyGame.Dice.roll());
		
	}

	function _addEventListeners(){
		document.querySelector("#btn-dice").addEventListener('click', _triggerRoll);
		document.querySelector('#start').addEventListener('click',_reset);
	}

	return {
		init: _init	
	}

})();