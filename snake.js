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
	 * @param {number} size -  mida de la quadricula
	 */
	constructor(width,height,size) {
	}

	/**
	 * Crea un canvas i es guarda el context a un atribut per poder
	 * accedir-hi als mètodes de pintar al canvas
	 * @param {number} width -  width del canvas
	 * @param {number} height -  height del canvas
	 */
	initCanvas(width, height) {
	}

	/**
	 * Inicialitza els paràmetres del joc
	 * Serp al centre, direcció cap a la dreta, puntuació 0
	 */
	start() {
	}

	/**
	 * Dibuixa un quadrat de la mida de la quadricula (passada al constructor) al canvas
	 * @param {number} x -  posició x de la quadricula (no del canvas)
	 * @param {number} y -  posició y de la quadricula (no del canvas)
	 * @param {string} color -  color del quadrat
	 */
	drawSquare(x,y,color) {
	}

	/**
	 * Dibuixa la serp al canvas
	 */
	drawSnake() {
	}

	/**
	 * Neteja el canvas (pinta'l de blanc)
	 */
	clear() {
	}

	/**
	 * Dibuixa la poma al canvas
	 */
	drawFood() {
	}

	/**
	 * La serp xoca amb la posició donada?
	 * @param {number} x -  posició x a comprovar
	 * @param {number} y -  posició y a comprovar
	 * @return {boolean} - xoca o no
	 */
	collides(x,y) {
	}

	/**
	 * Afegeix un menjar a una posició aleatòria
	 */
	addFood() {
	}

	/**
	 * Calcula una nova posició a partir de la ubicació 
	 * @return {Array} - nova posició
	 */
	newTile() {
	}

	/**
	 * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
	 * i ho dibuixa al canvas
	 */
	step() {
	}

	/**
	 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
	 * @param {event} e - l'event de la tecla premuda
	 */
	tecla(e) {
	}
}

let game = new Game(300,300,15); // Crea un nou joc
document.onkeydown = game.tecla.bind(game); // Assigna l'event de les tecles a la funció tecla del nostre joc
window.setInterval(game.step.bind(game),100); // Crida la funció que actualitza el nostre joc cada 100ms
