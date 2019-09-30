document.addEventListener("DOMContentLoaded", function(event)
{
var matricula2 = document.getElementById("matricula").value;
var traves = document.getElementById("traves").value;
var movimento = document.getElementById("movimento").value;
var hora = document.getElementById("hora").value;
var nivel = document.getElementById("nivel").value;
var transponder = document.getElementById("transponder").value;
var origem = document.getElementById("origem").value;
var destino = document.getElementById("destino").value;
var distancia = document.getElementById("traves").value;
var tipo = document.getElementById("tipo").value;
var esteira = document.getElementById("esteira").value;
resultado = document.getElementById("resultado");
}
)
;

function CriaAeronave(){
//matricula,traves,movimento,hora,nivel,transponder,origem,destino,distancia,tipo
resultado.innerHTML = 
resultado.innerHTML +
"<p>" + matricula.value.toUpperCase() + "</p>" +
"<p>" + origem.value.toUpperCase() + "-" + destino.value.toUpperCase() + "</p>" +
"<p>" + nivel.value.toUpperCase() + "</p>" +
"<p>" + hora.value.toUpperCase() + "</p>" +
"<p>" + distancia.value.toUpperCase() + "</p>" +
"<p>" + tipo.value.toUpperCase() + " " + esteira.value.toUpperCase() + "</p>" ;

}
