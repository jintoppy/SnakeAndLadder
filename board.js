window.MyGame = window.MyGame || {};
window.MyGame.Board = (function(){


	var snakePositions = [
	{
		type: 'snake',
		src: 30,
		dest: 10,
		diff: 20
	}, 
	{
		type: 'snake',
		src: 40,
		dest: 20,
		diff: 20
	},
	{
		type: 'snake',
		src: 20,
		dest: 15,
		diff: 5
	}];

	var ladderPositions = [
	{
		type: "ladder",
		src: 11,
		dest: 21,
		diff: 10
	},
	{
		type: "ladder",
		src: 20,
		dest: 95,
		diff: 75
	}];

	var bummerPositions = 
	[{
		type: "bummer",
		src: 5
	}
	];

	function _getSnakePositions(){
		return snakePositions;
	}

	function _getLadderPositions(){
		return ladderPositions;
	}

	function _getBummerPositions(){
		return bummerPositions;
	}

	function _init(){
		_generateBoard();
		_placeSnakes();
		_placeLadders();
		_positionBummer();
	}

	function _generateCell(index){
		var div = document.createElement('div');
		div.className = "board-cell";
		div.id = "cell-"+ index;
		div.innerText = index;
		return div;
	}

	function _generateBoard(){
		var board = document.querySelector("#game-board");
		board.innerHTML = "";
		for(var i=100;i>0;i--){
			var cell = _generateCell(i);
			board.appendChild(cell);
		}
	}

	function _moveDice(targetIndex, playerIndex){
		var targetCell = document.querySelector('#cell-'+targetIndex);
		var targetDice =  document.querySelector('#dice'+playerIndex);
		//usning jquery here to get the offset
		var destination = $(targetCell).offset(); 
		$(targetDice).css({
			top: destination.top,
			left: destination.left
		});
	}

	function _restoreBoardState(state){
		_moveDice(state.player1, 1);
		_moveDice(state.player2,2);
	}

	function _setBoardAsPerNewState(state, checkBoth){
		if(checkBoth){
			_restoreBoardState(state);
		}
		else{
			state.nextPlayer === 1? _moveDice(state.player1, 1):_moveDice(state.player2,2);	
		}
	}

	function _placeSnakes(){
		snakePositions.forEach(setMsgToCell);
	}

	function setMsgToCell(item){
		var targetCell = document.querySelector('#cell-'+item.src);
		var dest = item.dest ? item.dest: 0;
		targetCell.innerText = targetCell.innerText + ": "+ dest;
		$(targetCell).addClass(item.type + "-cell");
	}

	function _placeLadders(){
		ladderPositions.forEach(setMsgToCell);
	}

	function _positionBummer(){
		bummerPositions.forEach(setMsgToCell);
	}

	return {
		init: _init,
		setBoardAsPerNewState: _setBoardAsPerNewState,
		getSnakePositions: _getSnakePositions,
		getLadderPositions: _getLadderPositions,
		restoreBoardState: _restoreBoardState,
		getBummerPositions: _getBummerPositions
	};

})();