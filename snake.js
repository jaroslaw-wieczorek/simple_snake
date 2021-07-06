	// JSsnake
window.addEventListener('load', () => {

	let snake, move, nextMove, points, apple, running;
	const ctx = document.getElementById('snake-canvas').getContext('2d');

	// Prepare game
	setDefault();

	// Add arrow keys listner
    addKeyDownEventListener();

    // Set interval
    setInterval(renderFrame, 50);

	function renderFrame() {
		if (running) {

			if (nextMove.x !== -move.x || nextMove.y !== -move.y){
				move = nextMove;
			}
			// Change direction
			snake.push({
				x: processBound(getHead().x + move.x), 
				y: processBound(getHead().y + move.y)
			}); 

			if (snake.filter(square => square.x === getHead().x && square.y === getHead().y).length >= 2) {
				setDefault();
			} 
			else {

				// For debug where is head of snake
				// console.log(getHead());

				// Get point if snake get apple
				if (getHead().x == apple.x && getHead().y === apple.y) {
					points++;
					apple = generateAppleLocation();
				}

				points <= 0 ? snake.shift() : points--;
			}
		}

		// Draw background
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		// Draw snake
		ctx.fillStyle = 'yellow';
		snake.forEach(square => ctx.fillRect(square.x * 20, square.y * 20, 18, 18));
		
		// Draw apple
		ctx.fillStyle = 'red';
		ctx.fillRect(apple.x * 20, apple.y * 20, 18, 18)
	} 

	function getHead() {
		// Return snake head
		return snake[snake.length - 1];
	}

	function processBound(num) {
		if (num > 19) {
  			return 0;
  		} else if (num < 0) {
  			return 19;
  		}
  		return num;
  	}

	function setDefault() {
		// Star position
	  	snake = [{x: 10, y: 10}];
	  	[move, nextMove] = Array(2).fill({x: 0, y:0});

	  	// Min points
	  	points = 2;

	  	// Stop game
		running = false;

		// Put first apple
	  	apple = generateAppleLocation();
 	}

	function generateAppleLocation() {
		let loctaion;
		do {
			loctaion = {x: generateRandomNumber(19), y: generateRandomNumber(19)};
		} while(snake.filter(square => square.x === loctaion.x &&
								square.y === loctaion.y).length > 0);
		return loctaion;
	}

	function generateRandomNumber(max) {
		return Math.floor(Math.random() * (max + 1));
	}

	function addKeyDownEventListener() {
		window.addEventListener('keydown', e => {
			if (e.code.startsWith('Arrow')) {
				e.preventDefault();

				// Run game
				running = true;
			}
			switch(e.code){
				case 'ArrowLeft':
					nextMove = {x:-1, y: 0};
					break;
				case 'ArrowRight':
					nextMove = {x:1, y: 0};
					break;
				case 'ArrowDown':
					nextMove = {x:0, y: 1};
					break;
				case 'ArrowUp':
					nextMove = {x:0, y: -1};
					break;
				}
		});
	}
});
