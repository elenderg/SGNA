/* 
Função deste script:
Informar o témino do carregamento do DOM
Exibir e esconder o formulário de inserção de aeronaves
Adicionar e remover aeronaves
*/
document.addEventListener("DOMContentLoaded", function(event)
{console.log("DOM completamente carregado e analisado");});


function MostraForm() {
 form = document.getElementById("form");
  form.style.display = "block";
} 

function EscondeForm() {
form = document.getElementById("form");
document.getElementById('matricula').value = "";
document.getElementById('origem').value = "";
document.getElementById('destino').value = "";
document.getElementById('hora').value = "";
document.getElementById('nivel').value = "";
document.getElementById('transponder').value = "";
form.style.display = "none";
} 

document.onkeydown = function ChecaTecla(tecla){
  
  //var form = document.getElementById('form');
  //var display = form.style.display;
  
  //var comprimento = matricula.lenght;
  /*if (form.style.display = "none")
  {var formoculto = true;
    console.log(form.style.display);}
  else
   {var formoculto = false;
    console.log(form.style.display);}*/

    var matricula = document.getElementById('matricula');
    if ( event.keyCode == 17 )
     {
       console.log("A tecla Ctrl foi pressionada");       
     }  
    if ( event.keyCode == 18 )
     {
       console.log("A tecla Alt foi pressionada");       
     }  
     if ( event.keyCode == 122 )
     {
       console.log("A tecla F11 foi pressionada");
      }  
     if ( event.keyCode == 123 )
     {
       console.log("A tecla F12 foi pressionada");
     }  

  if  (document.getElementById('form').style.display == '' || document.getElementById('form').style.display == 'none')
    {
    //console.log("O form estava oculto");
    document.getElementById('form').style.display = 'block';
    //console.log("Mas agora foi exibido");   
    matricula.focus(); 
     } 

 
  if (document.getElementById("form").style.display == "block" && event.keyCode == 27 )
  {
    //console.log(document.getElementById("form").style.display);
    EscondeForm();
    //console.log("A tecla Esc foi pressionada");
    //console.log(document.getElementById("form").style.display);
  }  
  if (document.getElementById("form").style.display == "block" && event.keyCode == 13 )
  {
    console.log("A tecla ↵ foi pressionada, a aeronave será adicionada");
    AdicionarAeronave();
    EscondeForm();
    //console.log(document.getElementById("form").style.display);    
  }  
}
