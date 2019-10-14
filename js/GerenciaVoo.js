var json, velocidade,diferença, Horatexto,resultado, resultado2, coordenadas1, coordenadas2, ad1, ad2, codaerodromo1, codaerodromo2;
var contagem = 0;
var selecionada = false;
/*var Hoje = new Date;
var HoraAtual = new Date.UTC();
var UTC = Hoje.getUTCHours();*/
var ad = [];
var i = 0;/*
var data = new Date();
var dia     = data.getDate();           // 1-31
var dia_sem = data.getDay();            // 0-6 (zero=domingo)
var mês     = data.getMonth();          // 0-11 (zero=janeiro)
var ano2    = data.getYear();           // 2 dígitos
var ano4    = data.getFullYear();       // 4 dígitos
var hora    = data.getHours();          // 0-23
var min     = data.getMinutes();        // 0-59
var seg     = data.getSeconds();        // 0-59
var mseg    = data.getMilliseconds();   // 0-999*/



// cria uma variável chamada json
function AdicionaCidade(Origem,Destino){ 
   var x = Destino.length;
   var z = Origem.length;   
   if (Origem == "ZZZZ" || Destino == "ZZZZ"){
         var distancia = document.getElementbyId('distancia').value.toUpperCase();
         var radial = document.getElementById('radial').value.toUpperCase();
         var rota = document.getElementById('rota').value.toUpperCase();
         var Coordenadas = document.getElementById('coordenadas').value.toUpperCase();
         console.log("Erro. Aeródromo ZZZZ não possui informações de latitude e longitude. Será feita uma estimativa")
         console.log(distancia + " " + radial + " " + rota);
         if(Origem == "ZZZZ" || Destino == "ZZZZ" && Coordenadas == ""){
            alert("Por favor, insira as coordenadas do ZZZZ")
         }
   }
   else if(x == 4  && z == 4 && json){ // x e z recebem a quantidade de caracteres digitados
         // caso a quantidade de caracteres dos aeródromos seja 4, e a variável json não esteja vazia, inicia a busca do aeródromo
         FunçãoBusca(Origem);
         FunçãoBusca(Destino);
   }
   else if(x ==4  && z == 4){
      // caso a variável esteja vazia, o que é o caso, faz-se o seguinte
      var ajax = new XMLHttpRequest(); 
      // a variável ajax recebe o valor da requisição ao servidor
      ajax.onreadystatechange = function(){
         //  o servidor pode retornar um dos valores abaixo. precisamos que esteja tudo ok
         if(this.readyState == 4 && this.status == 200){
         /*    A propriedade readyState retorna o estado do XMLHttpRequest, conforme tabela abaixo:
         0	UNSENT	
            Um cliente foi criado. Mas o método open()  não foi chamado ainda. 
         1	OPENED	
            O método open() foi chamado. 
            Durante esse estado, os headers da requisição podem ser inseridos usando o método setRequestHeader()  
            e o método send() pode ser chamado, iniciando a busca.
         2	HEADERS_RECEIVED
            o método send() foi chamado e os cabeçalhos e status estão disponíveis.  
            Os cabeçalhos de respostas foram recebidos.
         3	LOADING	
            Baixando e responseText contem os dados parciais. 
            A resposta da requisição está sendo recebida. se o responseType for "text" ou  um texto em branco, 
            o responseText terá o texto parcial da resposta conforme seu carregamento.
          4	DONE	
            Operação concluída. A Operação de busca está completa. 
            Isso pode significar que a trasferência foi concluída com êxito ou que falhou.
            
            status 200:  "OK"
            status 403:  "Forbidden"
            status 404:  "Page not found"            */
            json = JSON.parse(this.responseText);
            /*
            Um DOMString (UTF-16 String) que contém dados em formato de texto que foram recebidos usando o comando
            XMLHttpRequest. Pode retornar null se a solicitação falhar ou uma string vazia "" se a solicitação
            ainda não foi enviada com o método send().
            Quando usamos esta propriedade numa solictação assíncrona, o valor do responseText é tudo aquilo que o servidor enviou
            até agora, mesmo que não tenha recebido tudo ainda. Para saber se tudo terminou a gente usaa função para
            ver se a propriedade readyState é XMLHttpRequest.DONE (4), e o status é 200 ("OK").
            Se você receber um erro do tipo InvalidStateError é porque não recebeu texto, mas sim outra coisa.
            */
            FunçãoBusca(Origem);
            FunçãoBusca(Destino);
            }  // fim do if(this.readyState == 4 && this.status == 200){
      } // fim do  ajax.onreadystatechange = function(){ 

   ajax.open("GET", "dados.json", true); 
   /* aqui ele lê o arquivo dados.json
    a primeira parte tem a opção GET ou POST
   logo após vem a URL do arquivo
   e por último você deve especificar se é assíncrono ou não, nesse caso é assíncrono
   O "GET" é mais simples que o POST mas tem desvantagens
   Use POST quando:
   Não puder usar arquivos em cache (por exemplo, ao atualizar uma arquivo no banco de dados)
   o tamanho do arquivo é grande, pois o POST não tem limite pra tamanho do arquivo
   for input do usuário, que pode conter caracteres estranhos, nesse sentido é mais seguro usar o POST
   o formato do arquivo pode ser qualquer um, de txt, xml, json, asp, php, etc
   as requisições ao servidor devem ser assíncronas
   dessa forma, o javascript não tem que ficar esperando pela resposta do servidor
   podendo assim executar os outros scripts
   e continuar esse script assim que o servidor responder a solicitação */
   ajax.send();
   /*O método send(), do XMLHttpRequest, envia uma requisição para o servidor.
   Se a solicitação for assíncrona (que é o caso), esse método retornará assim que a solicitação for enviada
   e o resultado for entregue usando eventos. 
   Se a solicitação for síncrona, esse método não retornará até que a resposta chegue.*/
   }// fim do else if(x ==4  && z == 4){
   else{
      console.log("Oorreu um erro ao obter o valor dos aeródromos")
   } 
} // fim da função AdicionaCidade()
   
function FunçãoBusca(codigo){
   console.log("Função busca iniciada");
   if (i == 1) {
      console.log(Destino);
   
      resultado2 = json.filter(function(busca){return busca['CODIGO'] == codigo;});
      
      if(resultado2.length){ // Se achar o aeródromo
         //console.log(resultado2);
         //console.log(i);
         //console.log(resultado[i]);
         coordenadas2 = {latitude: resultado2[0]['latitude'], longitude: resultado2[0]['longitude']};
         //console.log(coordenadas2);
         // pega as coordenadas do aeródromo
         codaerodromo2 = resultado2[0]['CODIGO'];
         // o nome do aerodromo é armazenado numa posição do vetor aerodromo
         console.log(codaerodromo2);      
         addCity(coordenadas2, codaerodromo2);
         ad2 = addCity(coordenadas2, codaerodromo2);
                  //console.log(ad2);
         // adiciona o aeródromo no mapa
         //console.log(addCity(coordenadas2, codaerodromo2));
         if (i == 1) {
            addLine(ad1,ad2)
            console.log("Rota adicionada entre " +codaerodromo1 +"-"+codaerodromo2);
            //console.log(coordenadas1);
            //console.log(codaerodromo1);
            //addLine(addCity(coordenadas1, codaerodromo1),addCity(coordenadas2, codaerodromo2));
            //addLine(addCity({latitude: resultado[0]['latitude'], longitude: resultado[0]['longitude']}, codaerodromo1),addCity(coordenadas2, codaerodromo2));
            //console.log(addLine(ad1,ad2));
            
            console.log(i);
            Horatexto = Hora;   // passa a hora para a variável Horatexto
            console.log(Horatexto);
           
            Velocidade();    
            CriaStrip();
         }
         
      }   
      else{console.log("Aeródromo Inexistente: " + codigo); } }

  else if (i == 0) {
      console.log(Origem);
   
   resultado = json.filter(function(busca){return busca['CODIGO'] == codigo;});
   
   if(resultado.length){ // Se achar o aeródromo
      //console.log(resultado);          
      //console.log(i);
      //console.log(resultado[i]);
      coordenadas1 = {latitude: resultado[0]['latitude'], longitude: resultado[0]['longitude']};      
      // pega as coordenadas do aeródromo
      codaerodromo1 = resultado[0]['CODIGO'];
      console.log(codaerodromo1);
      // o nome do aerodromo é armazenado numa posição do vetor aerodromo
      addCity(coordenadas1, codaerodromo1);
      //console.log(coordenadas1);
      //console.log(codaerodromo1);      
      ad1 = addCity(coordenadas1, codaerodromo1);
      //console.log(ad1);
      // adiciona o aeródromo no mapa
      //console.log(addCity(coordenadas1, codaerodromo1));
      i = i + 1;  
      //console.log(i)
   }

   else{console.log("Aeródromo Inexistente: " + codigo); } }

   
}


function Velocidade(){
   i = 0;
   var Hora = parseInt(Horatexto.substr(0,2)) * 3600000;   
   console.log(Hora);   
   //console.log(typeof Hora);   
   var Minutos = parseInt(Horatexto.substr(2,2)) * 60000;   
   console.log(Minutos);   
   //console.log(typeof Minutos);     
   
   var DiaAtual = new Date();   
   //console.log(DiaAtual);   
   var DiaUTC =  DiaAtual.getUTCDate() * 86400000;   
   //console.log(DiaUTC);   
   var Dia = DiaUTC;   
   var HoraUTC = DiaAtual.getUTCHours() * 3600000;   
   //console.log(HoraUTC);   
   var MinutosUTC = DiaAtual.getUTCMinutes() * 60000;   
   //console.log(MinutosUTC);  
   
   if (Hora < HoraUTC) {   
       Hora = Hora + 86400000;   
   }
      
   var msAtual = DiaUTC + HoraUTC + MinutosUTC;   
   //console.log(msAtual);   
   var msInformado = Dia + Hora + Minutos;   
   //console.log(msInformado);   
   diferença = msInformado - msAtual;   
   console.log(diferença);  
 
}

function CriaStrip() {   
   while (contagem < QtAeronave) {
   var lista= document.getElementById("lista");   
   var palavra = "strip";                       // o objetivo dessas  linhas 
   var dados = "dados"                          // é criar id's dinamicamente para os elementos
   var stringdiv = "div";
   var stripid = palavra + contagem.toString(); // e para os conteúdos delas
   var dadosid = dados + contagem.toString();   //
   var divid = stringdiv +  contagem.toString();      //

   var Li = document.createElement("li"); // cria um item de lista para ser inserido na ul (lista não ordenada)
   Li.setAttribute("class", "cinza li");   // atribui as classe ao li criado
   
   
   var  Input = document.createElement("input"); // cria um elemento do tipo input  
   //console.log(Input);
   Input.setAttribute('name', 'painel')
   //console.log(Input);
   Input.setAttribute('type', 'radio'); // transforma o input no tipo radio button
   // console.log(Input);
   //console.log(stripid);
   Input.setAttribute("id", stripid);  // o input recebe a id strip1, strip2, strip3, e assim vai
   //console.log(Input);
   Input.setAttribute("class", "radiobutton"); 
   
   
   var Label = document.createElement("label");   // cria uma label que será adicionada ao li
   //console.log(Label);
   Label.htmlFor = stripid; // atribui o valor da variável stripid ao for do label 
   //console.log(Label);

    // <input type="radio" id="strip1"> <label for="strip1"></label>

   var DadosDaStrip = document.createElement("div");  // cria uma div com dados fundamentais
   DadosDaStrip.setAttribute("class", "lado-a-lado");    // atribui a classe stripdiv à div criada
   DadosDaStrip.setAttribute("id", divid);         // atribui uma id dinamicamente à div criada

   var DadosDoVoo = document.createElement("div");    // criamos  a div vai ficar dentro do li
                                                      // a qual tem dados adicionais do voo
   DadosDoVoo.setAttribute("class", "dados");         //atribui a classe dados à div criada
   DadosDoVoo.setAttribute("id", dadosid);            // atribui uma id dinamicamente à div criada
   
   Li.onkeydown = EditaStrip;
   Li.onclick = SelecionaStrip;
   Input.onkeydown = EditaStrip;
   Input.onclick = SelecionaStrip;
   Label.onkeydown = EditaStrip;
   Label.onclick = SelecionaStrip;
   DadosDaStrip.onkeydown = EditaStrip;
   DadosDaStrip.onclick = SelecionaStrip;
   DadosDoVoo.onkeydown = EditaStrip;
   DadosDoVoo.onclick = SelecionaStrip;
   
   DadosDaStrip.innerHTML = "<strong>" + Matricula + "</strong>" + "<br>"  + Origem + "&emsp;" + "<strong>" + Destino + "</strong>" + "<br>" + "<strong>" + Hora + "</strong>" +  "&emsp;" + Tipo + Esteira;   
   DadosDoVoo.innerHTML = Transponder + "&emsp;" + tipodenivel+ Nivel + "&nbsp;&nbsp;" + Rota  + "<br>"+ "<br>" +"&nbsp;&nbsp;" + tipodevelocidade +  velocidade ;

   lista.appendChild(Li);
   Li.appendChild(Input);
   Li.appendChild(Label); // From Input to Li
   Label.appendChild(DadosDaStrip);
   DadosDaStrip.appendChild(DadosDoVoo);


   contagem = contagem + 1;
   }

} 
function LimpaStrips(){
   selecionada = false;
   console.log("A função LimpaStrips() foi invocada com sucesso");
   var radiobutton = document.getElementsByClassName("radiobutton");
   for(i=0; i < radiobutton.length; i++) {
      radiobutton[i].checked = false;         
    }
  
}
function SelecionaStrip(){
  console.log("A função SelecionaStrip() foi invocada com sucesso");
  selecionada = true;
}



function EditaStrip(){  
   if (selecionada == true){
   console.log("A função EditaStrip() foi invocada com sucesso");
   // caso a strip Esteja selecionada
   if ( event.keyCode == 32 ) {
   // se o usuário apertar a barra de espaços
   //var PainelDeEdicao = document.getElementById(Editor);
   //PainelDeEdicao.style.display = "block";
     console.log("A barra de espaços foi pressionada");       
   } 
    /*
   for (i = 0; i <= contagem; i++) {
   var palavra = "strip";
   var stripid[] = palavra + i.toString();
   var strip[i] = document.getElementById(stripid);
   stripid[i].onkeydown = function() {
    selecionada = true;
    stripid[i].focus()
  };
   }*/
}

}
    
