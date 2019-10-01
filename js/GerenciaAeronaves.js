QtAeronave = 0;
Aeronave = [];
meuStorage = localStorage;
var Hora = "";

function CriarAeronave(Matricula, Origem, Destino, Hora,  Nivel, Tipo, Esteira, Transponder, Procedimento, Distancia, Rota, Movimento){
  this.Matricula = Matricula;
  this.Origem = Origem;
  this.Destino = Destino;
  this.Hora = Hora;
  this.Nivel = Nivel;
  this.Tipo = Tipo;
  this.Distancia = Distancia;
  this.Esteira = Esteira;
  this.Transponder = Transponder;
  this.Procedimento = Procedimento;
  this.Rota = Rota;
  this.Movimento = Movimento;
}

function AdicionarAeronave(){
    Movimento = document.getElementById('movimento').value.toUpperCase();   
    Matricula = document.getElementById('matricula').value.toUpperCase();
    Origem = document.getElementById('origem').value.toUpperCase();
    Destino = document.getElementById('destino').value.toUpperCase();
    Hora = document.getElementById('hora').value.toUpperCase();
    Nivel = document.getElementById('nivel').value.toUpperCase();
    Tipo = document.getElementById('tipo').value.toUpperCase();
    Distancia = document.getElementById('distancia').value.toUpperCase();
    Esteira = document.getElementById('esteira').value.toUpperCase();
    Transponder = document.getElementById('transponder').value.toUpperCase();
    Procedimento = document.getElementById('procedimento').value;
    Rota = document.getElementById('rota').value.toUpperCase();
    console.log("Matrícula: " +Matricula +"; Origem: " +Origem +"; Destino: " +Destino);
    console.log("Hora: " +Hora +"; Nivel: " +Nivel +"; Tipo: " +Tipo + "; Distância: " + Distancia);
    console.log("Esteira: " +Esteira +"; Transponder: " + Transponder + "; Procedimento: " + Procedimento + "; Rota: " + Rota);    
    if (Matricula && Origem && Destino && Hora) {
      if(Origem !== "SBHT" && Destino !== "SBHT" && Movimento != "QAY"){
        alert("Por favor, altere o valor Movimento para QAY ou QAF")
      }
      else {AdicionaAeronave(Matricula, Origem, Destino, Hora,  Nivel, Tipo, Esteira, Transponder, Procedimento, Rota)}
    }
    else {
        console.log("Como os dados da aeronave não foram preeenchidos, o comando foi ignorado")    
        alert("Por favor, preencha pelo menos os seguintes dados: \n 1.Matrícula \n 2.Origem \n 3.Destino \n 4.Hora ");
    }
    EscondeForm()
    console.log("Obs: O form foi ocultado")
}


function AdicionaAeronave(Matricula, Origem, Destino, Hora,  Nivel, Tipo, Esteira, Transponder, Procedimento, Rota, Distancia, Movimento){
    // Adiciona os valores da aeronave à  variável dados
    Aeronave[QtAeronave] = new CriarAeronave(Matricula, Origem, Destino, Hora,  Nivel, Tipo, Esteira, Transponder, Procedimento, Rota, Distancia, Movimento);
    //console.log(Aeronave[QtAeronave].matricula.length);    
    console.log("Se esta mensagem foi exibida, provavelmente os dados foram adicionados com sucesso")
    console.log(Aeronave[QtAeronave]);
    console.log(Aeronave[QtAeronave].Matricula);
    console.log("Se você viu a aeronave adicionada acima, é porque deu tudo certo");
    QtAeronave = QtAeronave + 1;
    console.log("Você já adicionou " +QtAeronave + " aeronaves ao sistema");  
    console.log(Origem, Destino);
    AdicionaCidade(Origem,Destino);
    //CriaRota(Aeronave,Origem,Destino)
}


/*
class CriarAeronave {
  constructor(Matricula, Origem, Destino, Hora, Nivel, Tipo, Esteira, Transponder, Procedimento, Distancia, Rota) {
    this.Matricula = Matricula;
    this.Origem = Origem;
    this.Destino = Destino;
    this.Hora = Hora;
    this.Nivel = Nivel;
    this.Tipo = Tipo;
    this.Distancia = Distancia;
    this.Esteira = Esteira;
    this.Transponder = Transponder;
    this.Procedimento = Procedimento;
    this.Rota = Rota;
  }
}*/

/* código preliminar. não utilizar. 
aeronave = [];
qtaeronave = 0;
repetidas = 0;
novaaeronave = ""; 

function AdicionarAeronave()
{
    
  if (Aeronave[Matricula] != null)
  {
    novaaeronave = novaaeronave;
    for ( i = 0; i < aeronave.length; i++)
    {
      if (aeronave[i] == novaaeronave)
      {
         confirma = window.confirm("A aeronave " + novaaeronave + " já foi adicionada anteriormente. Deseja continuar?")
        if (confirma)
        {
          aeronave[qtaeronave] = novaaeronave;
          console.log("A aeronave " + aeronave[qtaeronave] + " foi adicionada novamente, agora na posição " + qtaeronave + " do vetor");
          repetidas++;
          qtaeronave++;
          console.log("A quantidade de aeronaves adicionadas é de:" + qtaeronave)
          console.log("A quantidade de aeronaves repetidas é de: " + repetidas)
          return aeronave;
        }
        else
        {
          aeronave[qtaeronave] = "";
          window.alert("Comando Cancelado")
        }
      }
      else
      {
        aeronave[qtaeronave] = novaaeronave;
        console.log("A aeronave " + aeronave[qtaeronave] + " foi adicionada na posição " + qtaeronave + " do vetor");
        qtaeronave++; //1
        console.log("A quantidade de aeronaves adicionadas é de:" + qtaeronave)
        return aeronave;
      }
    }
  }

}

function SelecionaAeronave(){}

function RemoverAeronave()
{

  
     deletada = false;
    removida = (window.prompt("Digite a matrícula da Aeronave a ser removida"))
    if (removida != null)
    {
        removida = removida;
        for ( i = 0; i < aeronave.length; i++)
        {
            if (aeronave[i] == removida)
            {
                console.log("Aeronave foi encontrada na posição " + i + " do vetor e será removida");
                aeronave[i] = "";
                qtaeronave--;
                console.log("A quantidade de aeronaves atual é de: " + qtaeronave + " aeronaves")
                deletada = true;
            }
            else{}
        }
        if (deletada){window.alert("Aeronave Removida com sucesso")}
        else{window.alert("Aeronave " + removida + " não encontrada. Verifique a matrícula")}
    }
    
}
*/
