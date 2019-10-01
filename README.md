
# SGTA - SISTEMA DE GERENCIAMENTO DE TRÁFEGO AÉREO

O Objetivo é criar um sistema que permita ao usuário realizar as seguintes ações:

  - Adicionar e remover aeronaves, que serão exibidas no mapa.
  - Cada aeronave terá uma rota própria, que será exibida no mapa, de acordo com os dados informados no formulário.
  - As aeronaves se moverão da origem até o destino, desde o momento em que foram inseridas até o tempo limite especificado no formulário.

Futuramente pretende-se exibir as diferentes posições do circuito de tráfego [VFR](https://pt.wikipedia.org/wiki/Regras_de_voo_visual) e também os procedimentos [IFR](https://pt.wikipedia.org/wiki/IFR_%28avia%C3%A7%C3%A3o%29) das duas cabeceiras de SBHT.

## O form
O processo de inserção de aeronaves no sistema começa pelo form contido na página inicial (index.html)

Imagem do form: http://i.ibb.co/74mhvvG/form.png

Para acesso ao form basta clicar no botão + ou digitar qualquer coisa

**Indicativo:** é a matrícula da aeronave, geralmente composto de 5 caracteres, com comprimento máximo de 7 caracteres. Exemplos:

 - PTABC *ou* PT-ABC (o traço será ignorado)
 - GOL1234
 - FAB01
 - AGUIA01

**Hora:** Deve ser informa com quatro dígitos, sem ":" 


 - É a hora estimada de chegada da aeronave, caso o destino seja SBHT (Altamira)
 - Caso a origem seja SBHT, é a hora prevista para decolagem
 - É a hora  estimada de chegada da aeronave, caso o destino seja SJJJ (Aeroxingu)  mas a origem NÃO seja SBHT,  pois caso a origem seja SBHT, é a hora prevista para decolagem. 
 - Caso a origem seja SJJJ, e o destino NÃOseja SBHT é a hora prevista para decolagem. 
 - Caso não o destino e a origem não sejam SBHT, é o estimado para o través de SBHT,

**Origem/Destino:** É composto de 4 caracteres, a relação completa de aeródromos públicos e privados está disponível no arquivo [aerodromos.csv](https://github.com/elenderg/SGTA/blob/master/aerodromos.csv).

**Distância/Radial:** 

 - Caso o usuário informe na Origem ou Destino o código ZZZZ (aeródromo
   desconhecido. Ex: Helicóptero pousando num estádio de futebol) então
   o sistema irá pegar os dados da distância e radial informados para
   plotar a rota da aeronave no mapa.
 - Caso tanto a origem quanto o destino sejam ZZZZ a informação de
   distância e radial será considerada como a posição atual da aeronave
   e o destino será obtido a partir das informações constantes no campo
   Rota, que deverá conter as coordenadas de destino no formato
   012345.67S/0123456.78W ou 012345S/0123456W
Obs: analisa-se a possibilidade de inserir mais um campo no formulário, onde conste o nome do município, Unidade da Federação (UF) e o nome da localidade de partida, para facilitar o desenvolvimento
   

**Rota:**
A Rota é composta de vários elementos, tais como:
**DCT** - significa que o usuário irá efetuar uma trajetória em linha reta em relação ao ponto anterior e o posterior. Caso esta seja a única informação, considera-se o ponto anterior como a **Origem** e o posterior como o **Destino**.

**FIXO** - FIXOS são códigos compostos de 5 caracteres aleatórios (Ex: KOGSA, ROTAM, PACAI)

**N0###/F###** - parte de um ponto de mudança de rota. Ex: N0150F160
Exemplo de plano com essa informação: DCT UTBOL/N0150F160 IFR DCT
O plano diz que no fixo UTBOL a velocidade e nível da aeronave será alterado e a partir deste ponto o vôo será conduzido com base nas regras de vôo por instrumentos de auxílio à navegação aérea. No momento esta informação será desconsiderada por completo na avaliação das rotas pelo sitema, já que ainda não foi implementada diferenciação de níveis ou altitude. O mesmo vale para as informações de **Nível** abaixo.

**Nível:** Pode ser expresso de diferentes formas. Todas as formas abaixo são válidas:
 - F160 (16 MIL PÉS CNTP - **Condições Normais de Temperatura e
   Pressão** (**CNTP**))
 - F135 (13 MIL E 500 PÉS CNTP)
 - F010 (MIL PÉS CNTP )
 - F005 (500 PÉS CNTP)
 - A005 (500 PÉS DE ALTITUDE EM RELAÇÃO AO SOLO)
 - VFR (VÔO SOB REGRAS DE VÔO VFR, GERALMENTE CONDUZIDO ABAIXO DA   **MSA** - Altitude mínima de setor - 1000 PÉS ACIMA DE TODOS OS OBSTÁCULOS TERRESTRES)
 
 **Velocidade** de Cruzeiro (máximo 5 caracteres)

Contém a velocidade verdadeira de cruzeiro para a primeira parte ou a totalidade do voo em função de:

a) quilômetros por hora: a letra K, seguida de 4 algarismos;

Ex: **K0650**

b) nós: a letra N, seguida de 4 algarismos. 

Ex: **N0480**; ou

c) número Mach: a letra M, seguida de 3 algarismos, arredondado aos centésimos mais próximos.

Exemplo 3: (para o Mach 0.82)

 **M082**
