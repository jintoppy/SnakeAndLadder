window.MyGame = window.MyGame || {};
window.MyGame.Dice = (function(){
	var currentNumStatus = document.querySelector('#current-num');
	function _init(){
		currentNumStatus.innerHTML = "";
		$(".dice-box").css({
			top: 0,
			left: 0
		});
	}

	function _roll(){
		var num = Math.floor(Math.random() * 6) + 1;
		currentNumStatus.innerText = num;
		return num;
	}

	return {
		init: _init,
		roll: _roll
	};

})();