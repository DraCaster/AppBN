/*      Desarrolladora:
	   	       -Rojas Lujan-             */

var barcoActual = "1";
var barcosRestantes = 6;
var o = " ";
RANKING = "ranking";
INFO = "info";
SCORE = "score";
DATA = {
    name: 1,
    orien: "null",
    longitud: 2,
    pos_x: 0,
    pos_y: 0
};

DATA2 = {
    puntaje: 1000,
    jugadorActual: "humano",
    juegoTerminado: false
};
var array_barcosH = [];

var array_barcosC = [];

/* *********** FUNCIONES DE INICIALIZACION ******************** */

function iniciarCeldas(){
	for(var i=1; i<=8; i++){
		for(var j=1; j<=8; j++){
			var celda = document.getElementById("celda-"+i+"-"+j);
			celda.setAttribute("onclick","ubicar(event)");
			celda.setAttribute("data-valor","vacia");
			celda.setAttribute("data-x",j);
			celda.setAttribute("data-y",i);
			celda.setAttribute("class","circulo");
		}
	}
}

function iniciarTableros(){
	for(var i=1;i<=8; i++){
		for(var j=1; j<=8; j++){
			var celda = document.getElementById("celdaH-"+i+"-"+j);
			celda.setAttribute("data-x",j);
			celda.setAttribute("data-y",i);
			celda.setAttribute("data-valor","vacia");
			celda.setAttribute("class","circulo");
			celda.setAttribute("onclick","verificar(event)");
			
			celda = document.getElementById("celdaC-"+i+"-"+j);
			celda.setAttribute("data-x",j);
			celda.setAttribute("data-y",i);
			celda.setAttribute("data-valor","vacia");
			celda.setAttribute("class","circulo");
		}
	}
	asignarTableros();

}

/******************* ASIGNACION DE TABLEROS ********************/

function asignarTableros(){ //barcos de los dos tableros

	//Asigno el tablero del jugador al de la computadora

	var datos = getInfoBarcos(); //obtengo barcos del jugador

	datos.forEach(function (elem) { 

        if (elem.orien == "h"){
       		var x = elem.pos_x;
        	for(i=0; i < elem.longitud; i++){
        		var tableroC = document.getElementById("celdaC-"+elem.pos_y+"-"+x);
        		tableroC.setAttribute("data-valor","llena");
        		tableroC.setAttribute("data-barco",elem.name);
        		tableroC.className+=" pintarcelda";
        		x++;
        	}
        } //end if
        else {
        	var y = elem.pos_y;
        	for(i=0; i < elem.longitud; i++){
        		var tableroC = document.getElementById("celdaC-"+y+"-"+elem.pos_x);
        		tableroC.setAttribute("data-valor","llena");
        		tableroC.setAttribute("data-barco",elem.name);
        		tableroC.className+=" pintarcelda";
        		y++;
        	}
        }

        array_barcosH.push({
        	barco: elem.name,
        	long: parseInt(elem.longitud),
        	partes_hundidas: 0,
        	hundido: "no"
        });
	});



    //Asigno el tablero de la computadora al del jugador

    var longBarco = [2,2,3,3,4,5]; //longitud de cada barco
    var i=0;
    var ok = true;

    var pos_x = getRandomInt(1,9); 
    var pos_y = getRandomInt(1,9); 
    var orient = getRandomInt(1,3); // 1 es para horizontal 2 para vertical

    while (i <6){	
    	var ok = verificarPosicion(pos_x,pos_y,orient, longBarco[i]);
    	if (ok) {
    		if (orient == 1){ //horizontal
    			for(j=1; j <= longBarco[i]; j++){
    				var celda = document.getElementById("celdaH-"+pos_y+"-"+pos_x);
    				celda.setAttribute("data-valor","llena");
    				celda.setAttribute("data-marca","no");
    				celda.setAttribute("data-barco",i+1);
    				pos_x++;
    				celda.className+=" pintarcelda";
    				//comentar
        		}

    		}
    		else {
    			for(j=1; j <= longBarco[i]; j++){
    				var celda = document.getElementById("celdaH-"+pos_y+"-"+pos_x);
    				celda.setAttribute("data-valor","llena");
    				celda.setAttribute("data-marca","no");
    				celda.setAttribute("data-barco",i+1);
    				celda.className+=" pintarcelda";
    				//comentar
    				pos_y++;
    			}
    		}
    		array_barcosC.push({
        		barco: i+1,
    			long: longBarco[i],
        		partes_hundidas: 0,
        		hundido: "no"
       		 });
    		i++;
    		var pos_x = getRandomInt(1,9); 
    		var pos_y = getRandomInt(1,9); 
    		var orient = getRandomInt(1,3); // 1 es para horizontal 2 para vertical
    	} //end if principal
    	else {
    		var pos_x = getRandomInt(1,9); 
   			var pos_y = getRandomInt(1,9); 
    		var orient = getRandomInt(1,3); // 1 es para horizontal 2 para vertical
    	}
    }
}

function verificarPosicion(x,y,o,long){
	/* El valor del parametro 'o' indica la orientacion del barco 
		ya sea horizontal o vertical. Valores:
		1: horizonal
		2: vertical                                           */

	if (o== 1){ //horizontal

		var aux = parseInt(x) + parseInt(long) - 1;
		if (aux > 8) { //si el barco se cae del tablero
			return false;
		}
		else { //evaluar si hay posiciones ocupadas
			var ok = true;
			var i=0;
			while(ok && i < long) {
				var celda = document.getElementById("celdaH-"+y+"-"+x); 
				var valorcelda = celda.dataset.valor;
				if (valorcelda == "llena"){ 
					ok = false;
				}
				x++;
				i++; 
			}
			return (ok);
		}
	} // end if horizontal
	else { //vertical
		var aux = parseInt(y) + parseInt(long) -1;
		if (aux > 8){
			return false;
		}
		else {
			var ok=true;
			var i=0;
			while(ok &&  i< long){
				var celda = document.getElementById("celdaH-"+y+"-"+x);
				var valorcelda = celda.dataset.valor;
				if(valorcelda == "llena"){
					ok = false;
				}
				y++;
				i++;
			}
			return(ok);
		}

	}

} 

function getRandomInt(min, max) { //retorna un entero aleatorio
  return Math.floor(Math.random() * (max - min)) + min;
}

/* *******************FUNCIONES DE JUGABILIDAD ***************** */

function cambioTurno(){
	if(DATA2["jugadorActual"]=="humano"){
		DATA2["jugadorActual"] = "computadora";

	}
	else {
		DATA2["jugadorActual"] = "humano";
		
	}
	document.getElementById("jugador").innerHTML = "Juega: "+DATA2["jugadorActual"];

}

function cellClick(x,y){
	var celda = getCelda(x,y,DATA2["jugadorActual"]);

	if(celda.dataset.marca == "si"){
		alert("ya elegiste esta celda anteriormente");
		return false;
	}
	else {

		if (celda.dataset.valor == "vacia"){
			agua(x,y,DATA2["jugadorActual"]);
			DATA2["puntaje"] = DATA2["puntaje"] - 10;
			celda.setAttribute("data-marca","si");
		}
		else{
			var barcoC = celda.dataset.barco; //obtengo que barco toque 
			celda.setAttribute("data-marca","si"); //para que no se vuelva a elegir esta celda

			array_barcosC.forEach(function(elem){ //recorro el arreglo hasta encontrar la info de mi barco actual

				if (elem.barco == barcoC){ //si coincide el barco
					elem.partes_hundidas= elem.partes_hundidas + 1;
					tocado(x,y,DATA2["jugadorActual"]); 
					if (elem.long == elem.partes_hundidas){ //si coincide la long con las partes hundidas
						elem.hundido = "si";
					}

				}
			});
		}
	return true;
	}
}

function tocado(x,y,panel){
	var celda = getCelda(x,y,panel);
	celda.className+=" barcoTocado";
	sonido_bomba();
}

function verificar(event){
	/*Verifica que sea el turno de la persona y no de la computadora, 
		en caso de ser su turno , se ejecutan las acciones correspondientes*/


	if (DATA2["jugadorActual"]=="computadora"){
		alert("Es el turno de la computadora");
	}
	else{
		var celda = event.target; //obtengo la celda elegida
		var x = celda.dataset.x;
		var y = celda.dataset.y; //obtengo las coordenadas de la celda
		if (!cellClick(x,y)){
			return false;
		}

		if (finJuego(DATA2["jugadorActual"])){
			if (DATA2["jugadorActual"]=="humano"){
				guardarPuntos(DATA2["puntaje"]);
				window.location.href="ganador.html";
			}
		}
		var mediaquery = window.matchMedia("screen and (max-width: 520px)");
		if (mediaquery.matches) {
		    //document.getElementById("contenedor-humano").removeAttribute("ocultarHumano");
		   	var tableroHumano = document.getElementById("contenedor-humano");
		   	tableroHumano.style.display= "none";
			
			var tableroPc = document.getElementById("contenedor-computadora");
			tableroPc.style.display = "block";
		}
		cambioTurno();
		movimientoComputadora();
		verificarComputadora();
		cambioTurno();
		cambio_tablero();
		//setTimeout("movimientoComputadora();", 3000);
		//setTimeout("cambioTurno();", 3000);
		//setTimeout("cambio_tablero()",4000);

		
	}
}

function verificarComputadora(){
	if (finJuego(DATA2["jugadorActual"])){
			if (DATA2["jugadorActual"]=="computadora"){
				window.location.href="perdiste.html";
			}
}	}

function cambio_tablero(){
	var mediaquery = window.matchMedia("screen and (max-width: 520px)");
		if (mediaquery.matches) {
		    //document.getElementById("contenedor-humano").removeAttribute("ocultarHumano");
		   	var tableroHumano = document.getElementById("contenedor-humano");
		   	tableroHumano.style.display="block";

		   	var tableroPc = document.getElementById("contenedor-computadora");
		   	tableroPc.style.display="none";
			}
}



function movimientoComputadora(){
	var pos_x = getRandomInt(1,9);
	var pos_y = getRandomInt(1,9);
	var celda = getCelda(pos_x,pos_y,DATA2["jugadorActual"]);

	while(celda.dataset.marca == "si"){ //si ya jugo en esta casilla 
		var pos_x = getRandomInt(1,9);
		var pos_y = getRandomInt(1,9);
		var celda = getCelda(pos_x,pos_y,DATA2["jugadorActual"]);
	}
	if (celda.dataset.valor == "vacia") { //si esa celda esta vacia
			agua(pos_x,pos_y,DATA2["jugadorActual"]);
			celda.setAttribute("data-marca","si");
	}
	else {
		var barcoH = celda.dataset.barco; //obtengo el barco que toque
		celda.setAttribute("data-marca","si");
		var datos = array_barcosH; //me quedo con el arreglo donde esta la info de los barcos 
		datos.forEach(function(elem){ //recorro el arreglo hasta encontra la info de mi barco actual
			if(elem.barco == barcoH){ //si coincide el barco
				elem.partes_hundidas = elem.partes_hundidas + 1;
				tocado(pos_x,pos_y,DATA2["jugadorActual"]);
				if(elem.long == elem.partes_hundidas){ //verifica que este completamente hundido
						elem.hundido = "si";
				}

			}

		});
	}
}

function finJuego(panel){

	var barcoshundidos = 0;

	if (panel == "humano"){
			var datos = array_barcosC; //obtengo la info de los barcos
			datos.forEach(function(elem){
				if (elem.hundido == "si") {
					barcoshundidos++;
				}
			});
			if (barcoshundidos == 6){
					return true;
			}
			else {
				return false;
			} 
	}
	if (panel == "computadora"){
		//var datos = array_barcosC;
		var datos = array_barcosH;
		datos.forEach(function(elem){
			if(elem.hundido == "si"){
				barcoshundidos++;
			}
		});
		if(barcoshundidos == 6){
			return true;
		}
		else {
			return false;
		}
	}			
}

function getCelda(x,y,panel){
	/* Retorna una celda con las coordenadas x e y ,
	dependiendo del tablero en el que se este jugando */
	if (panel == "humano"){
		return (document.getElementById("celdaH-"+y+"-"+x));
	}
	else{
		return (document.getElementById("celdaC-"+y+"-"+x));
	}
}

function agua(x,y,panel){
	var celda = getCelda(x,y,panel);
	/*
	 $(celda).removeClass("circulo");*/
	celda.className+=" agua";
	sonido_agua();
}



/* ************** FUNCIONES PARA EL ARMADO DEL TABLERO **************** */

function seleccionarSiguienteBarco(){

	var barco = document.getElementById("barco"+barcoActual);
	var long = barco.dataset.long;
	var hijos = barco.childNodes;

	for(var i=1;i<=long;i++){
		hijos[i].className+=" colorgris";	
	}
	barcoActual++;
	if(barcoActual<=6){

		barco = document.getElementById("barco"+barcoActual);
		long = barco.dataset.long;
		hijos= barco.childNodes;

		for(var i=1; i<=long;i++){
			hijos[i].className+=" coloramarillo"; 
		}
	}
}

function ubicarVertical(x,y,long){
	for (var i = 0; i < long; i++) {
		var celda = document.getElementById("celda-"+y+"-"+x);
		celda.className+=" pintarcelda";
		celda.setAttribute("data-valor","llena");
		y++;
	}
	seleccionarSiguienteBarco();
}

function ubicarHorizontal(x,y,long){

	for (var i = 0; i < long; i++) {
		var celda = document.getElementById("celda-"+y+"-"+x);
		celda.className+=" pintarcelda";
		celda.setAttribute("data-valor","llena");
		x++;
	}
	seleccionarSiguienteBarco();

}


function verifHorizontal(x,y,long){

	var aux = parseInt(x) + parseInt(long) - 1;
	if (aux > 8) {
		alert("El barco se cae");
		return (false);
	}
	else {
		var ok = true;
		var i=0;
		while(ok && i < long) {
			var celda = document.getElementById("celda-"+y+"-"+x); 
			var valorcelda = celda.dataset.valor;
			if (valorcelda == "llena"){ 
				ok = false;
				alert("Posicion ocupada");
			}
			x++;
			i++;
		} //while
	return (ok);
	} //else
}


function verifVertical(x,y,long){

	var aux = parseInt(y) + parseInt(long) - 1; 	

	if (aux > 8) {
		alert("El barco se cae");
		return (false);
	}
	else {
		var ok = true;
		var i=0;
		while(ok && i < long) {
			var celda = document.getElementById("celda-"+y+"-"+x);
			var valorcelda = celda.dataset.valor;
			if (valorcelda == "llena"){ 
				alert("Posicion ocupada");
				return(false);
			}
			y++;
			i++;
		} //while
	return (ok);
	} //else
} 

function getInfoBarcos() {
    var datos = localStorage.getItem(INFO);
    localStorage.removeItem("info");
    return (datos) ? JSON.parse(datos) : [
    ];
}

function guardarBarco(o,long,x,y){
	
	var info = getInfoBarcos();

	/*Asumimos que name es el barco se guarda el numero del barco */

	info.push({
		name: barcoActual - 1,
		orien: o,
		longitud: long,
		pos_x: x,
    	pos_y: y});
	 localStorage[INFO] = JSON.stringify(info);

}


function ubicarBarco(x,y){

	var barco = document.getElementById("barco"+barcoActual); //barco a ubicar
	var long = barco.dataset.long; //longitud del barco
	var H = document.getElementById("ubicacionH").checked; //para saber si es h o v 

	if (H) { //si el usuario eligio horizontal
		var ok = verifHorizontal(x,y,long); //verifico que se pueda ubicar ahi
		if (ok == true){
			ubicarHorizontal(x,y,long);
			o = "h";
			guardarBarco(o,long,x,y);
			barcosRestantes=barcosRestantes-1;
			if  (barcosRestantes == 0){
				window.location.href="jugar.html";
			}
		}
	}
	else {
		var V = document.getElementById("ubicacionV").checked;
		if (V){
			var ok = verifVertical(x,y,long);
			if (ok == true){
				ubicarVertical(x,y,long);
				o = "v";
				guardarBarco(o,long,x,y);
				barcosRestantes=barcosRestantes-1;
				if  (barcosRestantes == 0){
					window.location.href="jugar.html";
				}
			}
		}
		
	} //end else
	if (V == false){
		alertify.alert("<img src='./img/img1.png'> <h1><b> &iexcl; ELEGI HORIZONTAL O VERTICAL !</h1>", function() {
        //aqui introducimos lo que haremos tras cerrar la alerta.
    });
	}

}

function ubicar(event){
	var ubicacion = event.target; //obtengo la celda elegida
	var ubicacion_x = ubicacion.dataset.x;
	var ubicacion_y = ubicacion.dataset.y; //obtengo las coordenadas de la celda
	ubicarBarco(ubicacion_x,ubicacion_y);
}


/* **************** OTRAS FUNCIONES DEL JUEGO ************ */

function reiniciar(event) {
	alertify.confirm("<img src='./img/img1.png'> <h1><b> Estas seguro? </b></h1>", function(e) {
        if (e) {
            alertify.success("ELEGISTE '" + alertify.labels.ok + "'");
            setTimeout(function() {
                window.location.reload(); 
            }, 1300);
        } else {
            alertify.error("ELEGISTE '" + alertify.labels.cancel + "'");
        }
    });
}

function ganador(){
	sonido_fin();
	var score = getPuntos();
	document.getElementById("ganador").innerHTML = "¡Hice "+score +" puntos!";
}

function abandonar(event){
	alertify.confirm("<img src='./img/img1.png'> <h1><b> Estas seguro? </b></h1>", function(e) {
        if (e) {
            alertify.success("ELEGISTE '" + alertify.labels.ok + "'");
            setTimeout(function() {
                window.location.href="index.html"; 
            }, 1300);
        } else {
            alertify.error("ELEGISTE '" + alertify.labels.cancel + "'");
        }
    });
}

function ocultarTableropc(){


}

function ocultarTableroHumano(){


}


/* **************** FUNCIONES DEL RANKING ********************* */


function guardarPuntos(puntos){
		score = puntos;
		localStorage[SCORE] = JSON.stringify(score); 
}

function getPuntos(){
	var score = localStorage.getItem(SCORE);
	return (JSON.parse(score));

}
function getRanking(){
	var ranking = localStorage.getItem(RANKING);
    return (ranking) ? JSON.parse(ranking) : [
    ];

}
function agregarAlRanking(){

	var puntaje = getPuntos();
 	var ranking = getRanking();
    var nombre = prompt('Entraste al ranking, ingresa tu nombre');
    ranking.push({
        name: nombre,
        value: puntaje
    });
    ranking.sort(function (puntajeA, puntajeB) {
        return puntajeB.value - puntajeA.value
    });
    if (ranking.length > 10) {
        ranking.length = 10
    };
    localStorage[RANKING] = JSON.stringify(ranking);
   //window.location.href = 'ranking.html';
}  

function entraEnElRanking(){
	var score = getPuntos();
	var ranking = getRanking();
	if(ranking.length<10){ //si el ranking no esta ocupado del todo
		return true;
	}
	return(score > ranking[9].value);
}

function mostrarRanking(){
	var ranking = getRanking();
	var elemento = document.getElementById("ranking");
	var fila;
	var puesto = 1;
	ranking.forEach(function(elem){
		fila = document.createElement("li");
		fila.innerHTML ='<span class="puesto" >'+ puesto + '</span>'+'<span class="nombre" >'+elem.name+"</span>"+elem.value;
		elemento.appendChild(fila);
		puesto++;
	});
}



function ganador(){
	var score = getPuntos();
	document.getElementById("ganador").innerHTML = "Conseguiste: "+score +" puntos!!";
	if (entraEnElRanking()){  
	alertify.confirm("<img src='./img/img1.png'> <h1><b>&iexcl; FELICIDADES ! ENTRASTE AL RANKING. <br> DESEAS APARECER EN EL? </b></h1>", function(e) {
        if (e) {
            alertify.success("ELEGISTE '" + alertify.labels.ok + "'");
            setTimeout(function() {
                agregarAlRanking();
            }, 1300);
        } else {
            alertify.error("ELEGISTE '" + alertify.labels.cancel + "'");
            setTimeout(function() {
              window.location.href="index.html";
            }, 1300);
        }
    }); 
		
	}
}