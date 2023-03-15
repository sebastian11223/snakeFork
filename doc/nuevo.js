/**
 * Classe que representa el joc de la serp (snake)
 * @class
 */
class Game {
	/**
	 * Inicialitza els paràmetres del joc i crea el canvas
	 * @constructor
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 * @param {number} amount -  nombre de quadrats per fila de la quadrícula
	 */
	constructor(width,height,amount) {
		this.width = width;
		this.height = height;
		this.amount = amount;
		this.initCanvas(width,height);
		this.start();
	}

	/**
	 * Crea un canvas i es guarda el [context](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D) a un atribut per poder
	 * accedir-hi des dels mètodes de pintar al canvas (com ara drawSquare, clear)
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 */
	initCanvas(width, height) {
		let canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		canvas.style.border = "2px solid";
		document.getElementsByTagName("body")[0].appendChild(canvas);
		this.context = canvas.getContext('2d');
	}

	/**
	 * Inicialitza els paràmetres del joc:
	 * Serp al centre, direcció cap a la dreta, puntuació 0
	 */
	start() {
		this.serp = [[parseInt(this.amount/2),parseInt(this.amount/2)]];
		this.menjar = [1,1];
		this.puntuacio = 0;
		this.direccio = [0,0];
	}

	iniciaJuego() {
		this.direccio = [1,0];
	}

	

	/**
	 * Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas
	 * @param {number} x -  posició x de la quadrícula (no del canvas)
	 * @param {number} y -  posició y de la quadrícula (no del canvas)
	 * @param {string} color -  color del quadrat
	 */
	drawSquare(x,y,color) {
		var gruix = this.width/this.amount;
		this.context.fillStyle = color;
		this.context.fillRect(x * gruix, y * gruix, gruix, gruix)
	}	

	/**
	 * Neteja el canvas (pinta'l de blanc)
	 */
	clear() {
		this.context.fillStyle = "white"; 
		this.context.fillRect(0,0,this.width,this.height)

	}

	/**
	 * Dibuixa la serp al canvas
	 */
	drawSnake() {
		for (let i = 0; i < this.serp.length; i++)  {
			this.drawSquare(this.serp[i][0], this.serp[i][1], "green");
		}
	}

	/**
	 * Dibuixa la poma al canvas
	 */
	drawFood() {
		this.drawSquare(this.menjar[0], this.menjar[1], "blue");
	}

	/**
	 * La serp xoca amb la posició donada?
	 * @param {number} x -  posició x a comprovar
	 * @param {number} y -  posició y a comprovar
	 * @return {boolean} - xoca o no
	 */
	collides(x, y) {
		if (this.drawSquare(this.x) === x && this.drawSquare(this.y) === y) {
			alert("misma posición");
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
	 */
	addFood() {
		let x, y;
		do {
			//Generar una posición aleatoria para el alimento
			x = Math.floor(Math.random() * this.amount);
			y = Math.floor(Math.random() * this.amount);
		} while (this.collides(x, y)); //comprobar si la posición está en la serpiente
			this.menjar = [x, y]; //asignar la posición del alimento
			this.drawFood(); //dibujar el alimento en el canvas
	}
		
	/**
	 * Calcula una nova posició a partir de la ubicació de la serp
	 * @return {Array} - nova posició
	 */
	newTile() {
		//if (this.serp !== undefined){   //--> si ponemos el if, sale otro error en la funcion step
		const head = this.serp[this.serp.length - 1];
		const newHead = [head[0] + this.direccio[0], head[1] + this.direccio[1]];
		return newHead;
		//}
	}

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
		const newHead = this.newTile();

		// Comprobar si la serpiente ha chocado con los bordes del canvas
		if (newHead[0] < 0 || newHead[0] >= this.amount || newHead[1] < 0 || newHead[1] >= this.amount) {
			alert("Game over: chocado con los bordes");
			return;
		}

		// Comprobar si la serpiente ha chocado consigo misma
		for (let i = 0; i < this.serp.length - 1; i++) {
			if (newHead[0] === this.serp[i][0] && newHead[1] === this.serp[i][1]) {
			alert("Game over: chocado con la serpiente");
			return;
			}
		}

		// Comprobar si la serpiente ha comido
		if (newHead[0] === this.menjar[0] && newHead[1] === this.menjar[1]) {
			this.puntuacio++;
			this.serp.push(this.menjar.slice());
			this.addFood();
		} else {
			this.serp.shift();
			this.serp.push(newHead);
		}

		// Dibujar el nuevo estado del juego
		this.clear();
		this.drawSnake();
		this.drawFood();
	}

	/**
	 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
	 * @param {event} e - l'event de la tecla premuda
	 */
	input(e) {
		//izquierda
		if (e.keyCode == 37) {
			this.direccio = [-1,0];
		}
		//arriba
		else if (e.keyCode == 38) {
			this.direccio = [0,-1]; 
		}
		//derecha
		else if (e.keyCode == 39) {
			this.direccio = [1,0]; 
		}
		//abajo
		else if (e.keyCode == 40) {
			this.direccio = [0,1];
		}
	}
}

let game = new Game(300,300,15); // Crea un nou joc
document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(game.step.bind(game),750); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms

