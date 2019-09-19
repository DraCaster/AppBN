


function sonido_agua(){
	document.addEventListener("deviceready", function(){
		var reproductor = new Media ("sonidos/water.wav", error);

		reproductor.play();
	}, false);
}
function sonido_bomba(){
	document.addEventListener("deviceready", function(){
		var reproductor2 = new Media ("sonidos/bomb.wav", error);

		reproductor2.play();
	}, false);
}
function sonido_fin(){
	document.addEventListener("deviceready", function(){
		var reproductor2 = new Media ("sonidos/win.wav", error);

		reproductor2.play();
	}, false);
}

function sonido_perdedor(){
	document.addEventListener("deviceready", function(){
		var reproductor2 = new Media ("sonidos/lose.wav", error);

		reproductor2.play();
	}, false);

}

function error(){
	console.log("no anda");
}

function camera(){
    navigator.camera.getPicture(Success, Fail, setOptions(srcType));
}
function Success(imageURI) {
    localStorage["foto"]=imageURI;
    compartirEn(); //Una vez finalizada de forma exitosa la captura, se realiza la accion de compartir
}
function Fail(message) {
    alert('Failed because: ' + message);
}
function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}
function compartirEn(){
	console.log("entro al compartir");
    var puntos=JSON.parse(localStorage["puntos"]);
    var imagen=localStorage.getItem("foto");
    var options = {
      message: document.getElementById("msj").value, // not supported on some apps (Facebook, Instagram)
      subject: 'Obtuve '+puntos+ ' puntos', // fi. for email
      files: [imagen], // an array of filenames either locally or remotely
      chooserTitle: 'Compartin en' // Android only, you can override the default share sheet title
    }
    var SuccessShare = function(result) {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    }
    var ErrorShare = function(msg) {
      console.log("Sharing failed with message: " + msg);
    }
    window.plugins.socialsharing.shareWithOptions(options, SuccessShare, ErrorShare);
}