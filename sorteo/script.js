function getRandom(){
	return {
		next: function(){

			let a = Math.floor(Math.random() * (3300 - 2800)+2800)
			let n = a.toString()
			while(n.length < 3){
			n = "0" + n
			}
			return {value: n, done: false}
		}
	}
}
function showNumber(){
	let numeroPantalla = rand.next().value

	document.getElementById('numero').innerHTML = numeroPantalla

}

const rand = getRandom()
boton = document.getElementById('btn')
boton.addEventListener('click', showNumber)




