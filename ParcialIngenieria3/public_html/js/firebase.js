/* global firebase */

$(document).ready(function () {

    cargar();

    $("#btnGuardar").click(function () {


        $usuario = $("#txtusuario").val();
        $comentario = $("#txtcomentario").val();
        $calificacion = $("#txtcalificacion").val();
        console.log(escribir($usuario, $comentario,$calificacion) + "es");

    });

    $("#btnMostrar").click(function () {

        cargar();

    });

});

function escribir(usuario, comentario,calificacion) {
    $tabla = "registroCartas";
    // A post entry.
    var postData = {
        usuario: usuario,
        comentario: comentario,
        calificacion:calificacion
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child($tabla).push().key;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/' + $tabla + '/' + newPostKey] = postData;
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
}




function cargar() {

    $tabla = "registroCartas";
    return firebase.database().ref($tabla).once('value').then(function (snapshot) {
        $data = snapshot.val();
        snapshot.forEach(logValue);

    });

    function logValue(info) {
        $fila = "";
        $usuario = info.val().usuario;
        $comentario = info.val().comentario;
        $calificacion = info.val().calificacion;
        $fila += "<tr>";
        $fila += "<td>" + $usuario + "</td>";
        $fila += "<td>" + $comentario + "</td>";
        $fila += "<td>" + $calificacion + "...</td>";
        $fila += "<td>13/06/2017</td>";
        $fila += "</tr>";
        $("#mitabla").append($fila);
        //console.log(info.val().dispositivo + " " + info.val().token);
    }
}